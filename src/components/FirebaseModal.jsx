import React, { useState } from "react";
import {
  getActiveFirebaseConfig,
  saveCustomFirebaseConfig,
  dataService
} from "../services/dataService";

export default function FirebaseModal({ isOpen, onClose, isLive, onResetData }) {
  if (!isOpen) return null;

  const currentConfig = getActiveFirebaseConfig();
  const [configText, setConfigText] = useState(
    JSON.stringify(currentConfig, null, 2)
  );
  const [statusMsg, setStatusMsg] = useState("");

  const handleSave = () => {
    try {
      const parsed = JSON.parse(configText);
      saveCustomFirebaseConfig(parsed);
      setStatusMsg("Firebase configuration saved! Reloading application...");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (e) {
      setStatusMsg("Error: Invalid JSON format. Please paste valid configuration object.");
    }
  };

  const handleClear = () => {
    saveCustomFirebaseConfig(null);
    setStatusMsg("Switched back to Local Demo Mode. Reloading...");
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" style={{ maxWidth: "600px" }} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ fontSize: "1.3rem" }}>🔥</span>
            <div>
              <h2 style={{ fontSize: "1.2rem", margin: 0 }}>Firebase Configuration</h2>
              <span className="mu" style={{ fontSize: "0.82rem" }}>
                Connect to Live Firestore or Run in Demo Mode
              </span>
            </div>
          </div>
          <button className="btn o close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="modal-body">
          {/* Current Status Pill */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: "12px 14px",
            borderRadius: "12px",
            background: isLive ? "#F0FDF4" : "#FFFBEB",
            border: `1.5px solid ${isLive ? "#86EFAC" : "#FDE68A"}`,
            marginBottom: "16px"
          }}>
            <span style={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              background: isLive ? "#16A34A" : "#D97706"
            }} />
            <div style={{ fontSize: "0.9rem", fontWeight: 700, color: isLive ? "#166534" : "#92400E" }}>
              {isLive
                ? `🟢 Connected to Live Firestore (${currentConfig.projectId})`
                : "🟡 Local Demo Mode Active (Offline Storage & Seed Data)"}
            </div>
          </div>

          <p style={{ fontSize: "0.88rem", color: "var(--mu)", margin: "0 0 12px", lineHeight: 1.5 }}>
            To connect to your Firebase project: Go to <strong>Firebase Console &gt; Project Settings &gt; Your Apps &gt; Web (&lt;/&gt;)</strong>, copy the config object, and paste it below:
          </p>

          <label className="f" style={{ marginTop: 0 }}>
            Firebase Web App Config (JSON):
          </label>
          <textarea
            value={configText}
            onChange={(e) => setConfigText(e.target.value)}
            style={{
              fontFamily: "monospace",
              fontSize: "0.82rem",
              minHeight: "140px",
              marginBottom: "14px"
            }}
          />

          {statusMsg && (
            <div style={{
              padding: "8px 12px",
              borderRadius: "8px",
              background: statusMsg.startsWith("Error") ? "#FEF2F2" : "#F0FDF4",
              color: statusMsg.startsWith("Error") ? "#B91C1C" : "#166534",
              fontSize: "0.85rem",
              fontWeight: 600,
              marginBottom: "14px"
            }}>
              {statusMsg}
            </div>
          )}

          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            <button type="button" className="btn" onClick={handleSave} style={{ flex: 1 }}>
              Save & Connect
            </button>
            <button type="button" className="btn o" onClick={handleClear}>
              Use Local Demo Mode
            </button>
          </div>

          <div style={{ borderTop: "1px solid var(--ln)", marginTop: "20px", paddingTop: "14px" }}>
            <div style={{ fontWeight: 700, fontSize: "0.9rem", marginBottom: "4px" }}>
              Reset Sample Data
            </div>
            <p className="mu" style={{ fontSize: "0.82rem", margin: "0 0 10px" }}>
              Restore original 8 research complaints from MBMC records (clears any mock test submissions).
            </p>
            <button
              type="button"
              className="btn o"
              onClick={() => {
                onResetData();
                setStatusMsg("Reset to initial MBMC seed dataset!");
              }}
              style={{ padding: "4px 12px", minHeight: "36px", fontSize: "0.82rem" }}
            >
              🔄 Reset to Default Seed Data
            </button>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn o" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
