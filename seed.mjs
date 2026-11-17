// Usage: FIREBASE_PROJECT_ID=your-project-id GOOGLE_APPLICATION_CREDENTIALS=./serviceAccount.json node seed.mjs
// (or set FIRESTORE_EMULATOR_HOST=127.0.0.1:8080 to seed the local emulator, no key needed)
import { readFileSync } from "node:fs";
import { initializeApp, applicationDefault } from "firebase-admin/app";
import { getFirestore, Timestamp, GeoPoint } from "firebase-admin/firestore";

const data = JSON.parse(readFileSync(new URL("./seed-data.json", import.meta.url), "utf8"));
const projectId = process.env.FIREBASE_PROJECT_ID;
if (!projectId) { console.error("Set FIREBASE_PROJECT_ID"); process.exit(1); }
initializeApp(process.env.FIRESTORE_EMULATOR_HOST ? { projectId } : { projectId, credential: applicationDefault() });
const db = getFirestore();
const ISO = /^\d{4}-\d{2}-\d{2}T/;
const conv = (v) => {
  if (typeof v === "string" && ISO.test(v)) return Timestamp.fromDate(new Date(v));
  if (Array.isArray(v)) return v.map(conv);
  if (v && typeof v === "object") {
    const k = Object.keys(v);
    if (k.length === 2 && k.includes("lat") && k.includes("lng")) return new GeoPoint(v.lat, v.lng);
    return Object.fromEntries(k.map((x) => [x, conv(v[x])]));
  }
  return v;
};
for (const [col, docs] of Object.entries(data)) {
  for (const { id, updates, ...rest } of docs) {
    const ref = db.collection(col).doc(id);
    await ref.set(conv(rest));
    for (const { id: uid, ...u } of updates || []) await ref.collection("updates").doc(uid).set(conv(u));
  }
  console.log(`done ${col}: ${docs.length} docs`);
}
console.log("Seeded. Open Firebase console > Firestore Database > Data.");
