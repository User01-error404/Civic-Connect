import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import BottomNav from "./components/BottomNav";
import HomeView from "./views/HomeView";
import ReportView from "./views/ReportView";
import TrackView from "./views/TrackView";
import CampaignsView from "./views/CampaignsView";
import HelpView from "./views/HelpView";
import StaffDashboard from "./components/StaffDashboard";
import ComplaintDetailModal from "./components/ComplaintDetailModal";
import FirebaseModal from "./components/FirebaseModal";
import InvigilatorGuideModal from "./components/InvigilatorGuideModal";
import { dataService } from "./services/dataService";
import { TRANSLATIONS } from "./data/translations";

export default function App() {
  const [activeView, setActiveView] = useState(() => {
    const hash = window.location.hash.replace("#", "");
    return ["home", "report", "track", "campaigns", "help", "staff"].includes(hash)
      ? hash
      : "home";
  });

  const [lang, setLang] = useState(() => localStorage.getItem("cc_lang") || "en");
  const [isDark, setIsDark] = useState(() => {
    return (
      localStorage.getItem("cc_theme") === "dark" ||
      (!localStorage.getItem("cc_theme") && window.matchMedia("(prefers-color-scheme: dark)").matches)
    );
  });

  const [complaints, setComplaints] = useState([]);
  const [isLive, setIsLive] = useState(false);
  const [userVotes, setUserVotes] = useState(() => dataService.getUserVotes());
  const [selectedComplaint, setSelectedComplaint] = useState(null);

  const [isFirebaseModalOpen, setIsFirebaseModalOpen] = useState(false);
  const [isInvigilatorModalOpen, setIsInvigilatorModalOpen] = useState(false);

  // Translation helper
  const t = (key) => {
    return TRANSLATIONS[lang]?.[key] || TRANSLATIONS.en?.[key] || key;
  };

  // Sync theme
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light");
    localStorage.setItem("cc_theme", isDark ? "dark" : "light");
  }, [isDark]);

  // Sync language
  useEffect(() => {
    document.documentElement.lang = lang;
    localStorage.setItem("cc_lang", lang);
  }, [lang]);

  // Sync hash routing
  useEffect(() => {
    const handleHash = () => {
      const h = window.location.hash.replace("#", "");
      if (["home", "report", "track", "campaigns", "help", "staff"].includes(h)) {
        setActiveView(h);
      }
    };
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  const changeView = (v) => {
    setActiveView(v);
    window.location.hash = v;
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Subscribe to real-time complaints
  useEffect(() => {
    const unsubscribe = dataService.subscribe((list, liveState) => {
      setComplaints(list);
      setIsLive(liveState);
    });
    return () => unsubscribe();
  }, []);

  const handleCreateComplaint = async (data) => {
    const created = await dataService.addComplaint(data);
    setUserVotes(dataService.getUserVotes());
    return created;
  };

  const handleUpdateStatus = async (id, newStatus, note, actorRole) => {
    await dataService.updateComplaintStatus(id, newStatus, note, actorRole);
    // If selected in modal, update that too
    if (selectedComplaint && selectedComplaint.id === id) {
      const fresh = dataService.getComplaints().find((c) => c.id === id);
      setSelectedComplaint(fresh);
    }
  };

  const handleToggleUpvote = async (id) => {
    await dataService.toggleUpvote(id);
    setUserVotes(dataService.getUserVotes());
  };

  const handleResetData = () => {
    dataService.resetToSeedData();
    setUserVotes([]);
  };

  return (
    <div className="app-layout">
      {/* Top Header Navbar */}
      <Navbar
        activeView={activeView}
        setActiveView={changeView}
        lang={lang}
        setLang={setLang}
        isDark={isDark}
        setIsDark={setIsDark}
        isLive={isLive}
        onOpenFirebaseModal={() => setIsFirebaseModalOpen(true)}
        onOpenInvigilatorModal={() => setIsInvigilatorModalOpen(true)}
        t={t}
      />

      {/* Main View Router */}
      <main className="main-content">
        {activeView === "home" && (
          <HomeView
            complaints={complaints}
            setActiveView={changeView}
            t={t}
          />
        )}

        {activeView === "report" && (
          <ReportView
            onSubmitComplaint={handleCreateComplaint}
            setActiveView={changeView}
            t={t}
          />
        )}

        {activeView === "track" && (
          <TrackView
            complaints={complaints}
            onSelectComplaint={(c) => setSelectedComplaint(c)}
            onUpvote={handleToggleUpvote}
            userVotes={userVotes}
            t={t}
          />
        )}

        {activeView === "campaigns" && (
          <CampaignsView
            lang={lang}
            t={t}
          />
        )}

        {activeView === "help" && (
          <HelpView
            t={t}
          />
        )}

        {activeView === "staff" && (
          <StaffDashboard
            complaints={complaints}
            onUpdateStatus={handleUpdateStatus}
            onSelectComplaint={(c) => setSelectedComplaint(c)}
            t={t}
          />
        )}
      </main>

      {/* Footer */}
      <footer>
        <div className="lane" style={{ marginBottom: "12px" }} />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "10px" }}>
          <span>{t("footText")}</span>
          <div style={{ display: "flex", gap: "12px" }}>
            <button
              type="button"
              onClick={() => setIsInvigilatorModalOpen(true)}
              style={{ background: "none", border: 0, color: "var(--in)", cursor: "pointer", fontWeight: 600, fontSize: "0.82rem" }}
            >
              🎓 Invigilator Demo Script
            </button>
            <button
              type="button"
              onClick={() => setIsFirebaseModalOpen(true)}
              style={{ background: "none", border: 0, color: "var(--in)", cursor: "pointer", fontWeight: 600, fontSize: "0.82rem" }}
            >
              🔥 Firebase Config
            </button>
          </div>
        </div>
      </footer>

      {/* Mobile Bottom Navigation */}
      <BottomNav
        activeView={activeView}
        setActiveView={changeView}
        t={t}
      />

      {/* Complaint Detail & Real Timeline Modal */}
      {selectedComplaint && (
        <ComplaintDetailModal
          complaint={selectedComplaint}
          onClose={() => setSelectedComplaint(null)}
          onUpvote={handleToggleUpvote}
          hasUpvoted={userVotes.includes(selectedComplaint.id)}
          t={t}
        />
      )}

      {/* Firebase Setup Modal */}
      <FirebaseModal
        isOpen={isFirebaseModalOpen}
        onClose={() => setIsFirebaseModalOpen(false)}
        isLive={isLive}
        onResetData={handleResetData}
      />

      {/* Invigilator 3-Minute Demo Guide Modal */}
      {isInvigilatorModalOpen && (
        <InvigilatorGuideModal
          onClose={() => setIsInvigilatorModalOpen(false)}
        />
      )}
    </div>
  );
}
