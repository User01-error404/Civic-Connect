import React from "react";

export default function InvigilatorGuideModal({ onClose }) {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" style={{ maxWidth: "680px" }} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ fontSize: "1.4rem" }}>🎓</span>
            <div>
              <h2 style={{ fontSize: "1.25rem", margin: 0 }}>3-Minute Invigilator Demo Script</h2>
              <span className="mu" style={{ fontSize: "0.82rem" }}>Idea Lab 3 Presentation Guide</span>
            </div>
          </div>
          <button className="btn o close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="modal-body" style={{ lineHeight: 1.6 }}>
          <div style={{
            background: "#FFFBEB",
            border: "1.5px solid #FDE68A",
            borderRadius: "12px",
            padding: "14px",
            marginBottom: "16px",
            color: "#92400E"
          }}>
            <strong>💡 The Key "Smart" Feature to Pitch:</strong>
            <p style={{ margin: "4px 0 0", fontSize: "0.9rem" }}>
              In Mira-Bhayandar, <em>not every road belongs to MBMC</em>. Repairs are split across MBMC, MMRDA (Metro Line 9), Maharashtra State PWD (Ghodbunder Road), and NHAI. CivicConnect automatically routes complaints to the right agency via <code>roadOwnerId</code> alongside MBMC's official 6 Ward Committees.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div className="box" style={{ padding: "14px" }}>
              <div style={{ fontWeight: 800, color: "var(--in)", marginBottom: "4px" }}>
                Step 1: Open the Interactive Map & Multi-Agency Routing (1 min)
              </div>
              <ul style={{ paddingLeft: "20px", margin: "6px 0", fontSize: "0.9rem" }}>
                <li>Show the live map on the <strong>Track</strong> view. Point out pins on Metro Line 9 (MMRDA) and Ghodbunder Road (State PWD).</li>
                <li>Click a pin to show the <strong>Road Maintenance Agency breakdown</strong> and the <strong>Audit Timeline</strong> showing updates from field engineers.</li>
              </ul>
            </div>

            <div className="box" style={{ padding: "14px" }}>
              <div style={{ fontWeight: 800, color: "var(--in)", marginBottom: "4px" }}>
                Step 2: Submit a Live Complaint with Pin-Drop & Auto-Compression (1 min)
              </div>
              <ul style={{ paddingLeft: "20px", margin: "6px 0", fontSize: "0.9rem" }}>
                <li>Go to <strong>Report</strong>. Upload an image: show that it instantly compresses via client-side Canvas to ~45 KB (saving 95% bandwidth and keeping Firebase free).</li>
                <li>Tap on the interactive map to drop a pin: show how it automatically selects the nearest MBMC Ward Committee (1-6) and suggests the road owner.</li>
                <li>Submit the complaint and show the new Ticket Number generated (e.g. <code>CC-2026-000109</code>).</li>
              </ul>
            </div>

            <div className="box" style={{ padding: "14px" }}>
              <div style={{ fontWeight: 800, color: "var(--in)", marginBottom: "4px" }}>
                Step 3: The Staff Portal & Live Status Update (1 min)
              </div>
              <ul style={{ paddingLeft: "20px", margin: "6px 0", fontSize: "0.9rem" }}>
                <li>Switch to the <strong>Staff Portal</strong> tab. Show the newly submitted complaint in the queue.</li>
                <li>Change status from <em>Submitted</em> to <em>In Progress</em>, write an inspection note, and click <strong>Update Status</strong>.</li>
                <li>Switch back to <strong>Track</strong>: show that the pin color and audit timeline updated in real-time!</li>
              </ul>
            </div>

            <div className="box" style={{ padding: "14px", background: "var(--bg)" }}>
              <div style={{ fontWeight: 800, marginBottom: "4px" }}>
                Step 4 (If Firebase Console is Open):
              </div>
              <p style={{ margin: "4px 0", fontSize: "0.88rem" }}>
                Show the 6 collections in Firestore: <code>wards</code>, <code>roadOwners</code>, <code>categories</code>, <code>complaints</code>, <code>campaigns</code>, <code>config</code>. Open <code>wards/ward04</code> to show the real office address and source URL linking to <code>mbmc.gov.in</code>.
              </p>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn" onClick={onClose} style={{ width: "100%" }}>
            Got it, Let's Demo!
          </button>
        </div>
      </div>
    </div>
  );
}
