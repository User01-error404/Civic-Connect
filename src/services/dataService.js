import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getFirestore,
  collection,
  doc,
  addDoc,
  updateDoc,
  arrayUnion,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp
} from "firebase/firestore";
import { SEED_DATA } from "../data/seedData";
import { FIREBASE_CONFIG, isConfigValid } from "../firebaseConfig";

const LOCAL_STORAGE_KEY = "civicconnect_complaints_v2";
const UPVOTES_STORAGE_KEY = "civicconnect_user_upvotes";
const CONFIG_STORAGE_KEY = "civicconnect_firebase_config_custom";

// Ward centroids from MBMC official records
const WARD_CENTROIDS = SEED_DATA.wards.map(w => ({
  id: w.id,
  name: w.name,
  area: w.area,
  lat: w.centroid.lat,
  lng: w.centroid.lng
}));

/**
 * Smart Ward Matcher: finds nearest MBMC Ward Committee centroid
 */
export function findNearestWard(lat, lng) {
  if (!lat || !lng) return "ward01";
  let minDistance = Infinity;
  let nearestWardId = "ward01";

  for (const ward of WARD_CENTROIDS) {
    const dLat = ward.lat - lat;
    const dLng = ward.lng - lng;
    const dist = Math.sqrt(dLat * dLat + dLng * dLng);
    if (dist < minDistance) {
      minDistance = dist;
      nearestWardId = ward.id;
    }
  }
  return nearestWardId;
}

/**
 * Smart Road Owner Router:
 * Identifies maintenance jurisdiction by corridor landmarks and road tags
 */
export function suggestRoadOwner(address = "", wardId = "", lat = null, lng = null) {
  const text = address.toLowerCase();

  // 1. Metro Line 9 corridor (MMRDA)
  if (
    text.includes("metro") ||
    text.includes("line 9") ||
    text.includes("dahisar") ||
    text.includes("metro pillar")
  ) {
    return "mmrda";
  }

  // 2. Ghodbunder Road (State PWD)
  if (
    text.includes("ghodbunder") ||
    text.includes("hotel fountain") ||
    text.includes("chene") ||
    text.includes("kajupada")
  ) {
    return "pwd_state";
  }

  // 3. National Highway (NHAI)
  if (
    text.includes("nhai") ||
    text.includes("nh-8") ||
    text.includes("nh 8") ||
    text.includes("national highway") ||
    text.includes("western express highway")
  ) {
    return "nhai";
  }

  // Default: MBMC Municipal PWD
  return "mbmc";
}

/**
 * Image compressor: Resizes and converts to lightweight JPEG base64 (~40-60 KB)
 * Allows zero-cost Firebase Spark plan usage (no paid storage bucket required)
 */
export function compressImage(file, maxDimension = 640, quality = 0.65) {
  return new Promise((resolve, reject) => {
    if (!file) return resolve(null);
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = (e) => {
      const img = new Image();
      img.onerror = reject;
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxDimension) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          }
        } else {
          if (height > maxDimension) {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, width, height);
        ctx.drawImage(img, 0, 0, width, height);

        const dataUrl = canvas.toDataURL("image/jpeg", quality);
        resolve(dataUrl);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
}

/**
 * Get active Firebase Config (from localStorage override or code file)
 */
export function getActiveFirebaseConfig() {
  try {
    const custom = localStorage.getItem(CONFIG_STORAGE_KEY);
    if (custom) {
      const parsed = JSON.parse(custom);
      if (isConfigValid(parsed)) return parsed;
    }
  } catch (err) {
    console.warn("Could not read custom Firebase config from localStorage", err);
  }
  return FIREBASE_CONFIG;
}

export function saveCustomFirebaseConfig(config) {
  if (!config) {
    localStorage.removeItem(CONFIG_STORAGE_KEY);
  } else {
    localStorage.setItem(CONFIG_STORAGE_KEY, JSON.stringify(config));
  }
}

/**
 * Firebase Firestore State Management with LocalStorage Fallback
 */
class DataService {
  constructor() {
    this.listeners = new Set();
    this.firestoreUnsubscribe = null;
    this.isLive = false;
    this.db = null;
    this.cachedComplaints = this.loadLocalComplaints();
    this.initFirebase();
  }

  loadLocalComplaints() {
    try {
      const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error("Failed to load local complaints", e);
    }
    // Default to seed data
    const initial = JSON.parse(JSON.stringify(SEED_DATA.complaints));
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(initial));
    return initial;
  }

  saveLocalComplaints(complaints) {
    this.cachedComplaints = complaints;
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(complaints));
    } catch (e) {
      console.warn("Storage full or unavailable", e);
    }
    this.notifyListeners();
  }

  initFirebase() {
    const config = getActiveFirebaseConfig();
    if (isConfigValid(config)) {
      try {
        const app = getApps().length === 0 ? initializeApp(config) : getApp();
        this.db = getFirestore(app);
        this.isLive = true;
        this.setupFirestoreListener();
        console.log("🟢 Connected to live Firebase Firestore project:", config.projectId);
      } catch (err) {
        console.warn("Failed to initialize Firebase, falling back to local demo mode:", err);
        this.isLive = false;
      }
    } else {
      this.isLive = false;
      console.log("🟡 CivicConnect running in Local Demo Mode (Seed data + LocalStorage).");
    }
  }

  setupFirestoreListener() {
    if (!this.db) return;
    if (this.firestoreUnsubscribe) this.firestoreUnsubscribe();

    try {
      const q = query(collection(this.db, "complaints"), orderBy("createdAt", "desc"));
      this.firestoreUnsubscribe = onSnapshot(
        q,
        (snapshot) => {
          const docs = [];
          snapshot.forEach((d) => {
            const data = d.data();
            docs.push({
              id: d.id,
              ...data,
              createdAt: data.createdAt?.toDate ? data.createdAt.toDate().toISOString() : data.createdAt,
              updatedAt: data.updatedAt?.toDate ? data.updatedAt.toDate().toISOString() : data.updatedAt
            });
          });
          if (docs.length > 0) {
            this.cachedComplaints = docs;
            this.notifyListeners();
          }
        },
        (error) => {
          console.warn("Firestore subscription error (permissions or indexes), using local state:", error);
        }
      );
    } catch (e) {
      console.warn("Error establishing Firestore onSnapshot", e);
    }
  }

  subscribe(callback) {
    this.listeners.add(callback);
    // Immediately call with current state
    callback(this.cachedComplaints, this.isLive);
    return () => this.listeners.delete(callback);
  }

  notifyListeners() {
    for (const cb of this.listeners) {
      cb(this.cachedComplaints, this.isLive);
    }
  }

  getComplaints() {
    return this.cachedComplaints;
  }

  getUserVotes() {
    try {
      const raw = localStorage.getItem(UPVOTES_STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  saveUserVotes(votes) {
    try {
      localStorage.setItem(UPVOTES_STORAGE_KEY, JSON.stringify(votes));
    } catch {}
  }

  async toggleUpvote(complaintId) {
    const votes = this.getUserVotes();
    const hasVoted = votes.includes(complaintId);
    const newVotes = hasVoted ? votes.filter(id => id !== complaintId) : [...votes, complaintId];
    this.saveUserVotes(newVotes);

    const delta = hasVoted ? -1 : 1;

    // Update in memory & local storage
    const updated = this.cachedComplaints.map(c => {
      if (c.id === complaintId) {
        return {
          ...c,
          upvoteCount: Math.max(0, (c.upvoteCount || 0) + delta)
        };
      }
      return c;
    });
    this.saveLocalComplaints(updated);

    // If live Firestore, sync doc
    if (this.isLive && this.db) {
      try {
        const ref = doc(this.db, "complaints", complaintId);
        await updateDoc(ref, {
          upvoteCount: updated.find(c => c.id === complaintId)?.upvoteCount || 0
        });
      } catch (e) {
        console.warn("Firestore upvote update error:", e);
      }
    }
    return !hasVoted;
  }

  async addComplaint({
    subcategory,
    description,
    location,
    wardId,
    roadOwnerId,
    severity = 2,
    photoBase64 = null
  }) {
    const nowIso = new Date().toISOString();
    const nextNum = 100 + this.cachedComplaints.length + 1;
    const ticketNo = `CC-2026-${String(nextNum).padStart(6, "0")}`;
    const docId = `cc2026${String(nextNum).padStart(6, "0")}`;

    const newComplaint = {
      id: docId,
      ticketNo,
      reporterId: "citizen-web",
      category: "road_damage",
      subcategory,
      description,
      location: {
        geo: {
          lat: location.lat || 19.29,
          lng: location.lng || 72.85
        },
        address: location.address || "Mira-Bhayandar Road",
        approx: location.approx ?? true
      },
      wardId: wardId || findNearestWard(location.lat, location.lng),
      roadOwnerId: roadOwnerId || suggestRoadOwner(location.address, wardId),
      departmentId: "pwd",
      status: "submitted",
      severity: Number(severity),
      priority: severity === 3 ? "critical" : severity === 2 ? "high" : "medium",
      upvoteCount: 1,
      createdAt: nowIso,
      updatedAt: nowIso,
      photoBase64: photoBase64 || null,
      isSample: false,
      updates: [
        {
          id: "u1",
          type: "status",
          toStatus: "submitted",
          visibility: "public",
          actorRole: "Citizen Reporter",
          note: "Damage recorded with coordinates and photo.",
          createdAt: nowIso
        }
      ]
    };

    // Prepend to local cache
    const updatedList = [newComplaint, ...this.cachedComplaints];
    this.saveLocalComplaints(updatedList);

    // Record self upvote
    const votes = this.getUserVotes();
    if (!votes.includes(docId)) {
      votes.push(docId);
      this.saveUserVotes(votes);
    }

    // Push to live Firestore if configured
    if (this.isLive && this.db) {
      try {
        await addDoc(collection(this.db, "complaints"), {
          ...newComplaint,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        });
      } catch (err) {
        console.warn("Could not save to Firestore, stored locally:", err);
      }
    }

    return newComplaint;
  }

  async updateComplaintStatus(complaintId, newStatus, note, actorRole = "Ward Officer") {
    const nowIso = new Date().toISOString();
    const newUpdate = {
      id: `u-${Date.now()}`,
      type: "status",
      toStatus: newStatus,
      visibility: "public",
      actorRole,
      note: note || `Status transitioned to ${newStatus}.`,
      createdAt: nowIso
    };

    const updatedList = this.cachedComplaints.map(c => {
      if (c.id === complaintId) {
        const resolvedAt = newStatus === "resolved" ? nowIso : c.resolvedAt || null;
        return {
          ...c,
          status: newStatus,
          updatedAt: nowIso,
          resolvedAt,
          updates: [...(c.updates || []), newUpdate]
        };
      }
      return c;
    });

    this.saveLocalComplaints(updatedList);

    // Sync to Firestore if live
    if (this.isLive && this.db) {
      try {
        const ref = doc(this.db, "complaints", complaintId);
        await updateDoc(ref, {
          status: newStatus,
          updatedAt: serverTimestamp(),
          updates: arrayUnion(newUpdate)
        });
      } catch (err) {
        console.warn("Could not update Firestore document:", err);
      }
    }

    return true;
  }

  resetToSeedData() {
    const initial = JSON.parse(JSON.stringify(SEED_DATA.complaints));
    this.saveLocalComplaints(initial);
    localStorage.removeItem(UPVOTES_STORAGE_KEY);
    return initial;
  }
}

export const dataService = new DataService();
