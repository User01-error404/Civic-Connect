import React from "react";
import { SEED_DATA } from "../data/seedData";

export default function ComplaintDetailModal({
  complaint,
  onClose,
  onUpvote,
  hasUpvoted,
  t
}) {
  if (!complaint) return null;

  const ward = SEED_DATA.wards.find((w) => w.id === complaint.wardId) || {
    name: complaint.wardId || "Unknown Ward",
    office: "MBMC Ward Office",
    area: ""
  };

  const roadOwner = SEED_DATA.roadOwners.find((o) => o.id === complaint.roadOwnerId) || {
    name: complaint.roadOwnerId?.toUpperCase() || "MBMC",
    type: "municipal",
    note: "Municipal road infrastructure"
  };

  const statusMap = {
    submitted: { color: "var(--mu)", bg: "#F3F4F6", label: t("s_submitted") },
    acknowledged: { color: "var(--in)", bg: "#EFF6FF", label: t("s_acknowledged") },
    assigned: { color: "#7C3AED", bg: "#F5F3FF", label: t("s_assigned") },
    in_progress: { color: "var(--wa)", bg: "#FFFBEB", label: t("s_in_progress") },
    resolved: { color: "var(--ok)", bg: "#F0FDF4", label: t("s_resolved") }
  };

  const stInfo = statusMap[complaint.status] || statusMap.submitted;
  const updates = complaint.updates || [];

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Header Bar */}
        <div className="modal-header">
          <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
            <span className="tk" style={{ fontSize: "1.1rem", fontWeight: 700 }}>
              {complaint.ticketNo}
            </span>
            <span
              className="chip"
              style={{
                background: stInfo.bg,
                color: stInfo.color,
                borderColor: stInfo.color,
                fontWeight: 700
              }}
            >
              {stInfo.label}
            </span>
            {complaint.isSample && (
              <span className="tag" style={{ fontSize: "0.72rem" }}>
                Sample Research Data
              </span>
            )}
          </div>
          <button className="btn o close-btn" onClick={onClose} aria-label="Close modal">
            ✕
          </button>
        </div>

        <div className="modal-body">
          {/* Photo Preview if available */}
          {complaint.photoBase64 ? (
            <div
              style={{
                width: "100%",
                height: "220px",
                borderRadius: "14px",
                backgroundImage: `url('${complaint.photoBase64}')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                border: "1.5px solid var(--ln)",
                marginBottom: "16px"
              }}
            />
          ) : (
            <div
              style={{
                width: "100%",
                height: "140px",
                borderRadius: "14px",
                background: "linear-gradient(135deg, #1E2026 0%, #17181C 100%)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                color: "#FFC400",
                gap: "8px",
                marginBottom: "16px",
                border: "1.5px solid var(--ln)"
              }}
            >
              <span style={{ fontSize: "2rem" }}>🚧</span>
              <span style={{ fontWeight: 600, fontSize: "0.95rem" }}>
                {t("sub_" + complaint.subcategory) || "Road Damage Issue"}
              </span>
            </div>
          )}

          {/* Core Info Grid */}
          <div className="grid c2" style={{ gap: "12px", marginTop: "0" }}>
            <div className="box" style={{ padding: "14px" }}>
              <div className="mu" style={{ fontSize: "0.8rem", fontWeight: 600, textTransform: "uppercase" }}>
                {t("subL")}
              </div>
              <div style={{ fontWeight: 800, fontSize: "1.1rem", marginTop: "2px" }}>
                {t("sub_" + complaint.subcategory) || complaint.subcategory}
              </div>
              <div className="mu" style={{ fontSize: "0.85rem", marginTop: "4px" }}>
                Severity:{" "}
                <strong style={{ color: complaint.severity === 3 ? "#DC2626" : "#D97706" }}>
                  {complaint.severity === 3 ? "Dangerous" : complaint.severity === 2 ? "Serious" : "Minor"}
                </strong>
              </div>
            </div>

            <div className="box" style={{ padding: "14px" }}>
              <div className="mu" style={{ fontSize: "0.8rem", fontWeight: 600, textTransform: "uppercase" }}>
                {t("agencyJurisdiction")}
              </div>
              <div style={{ fontWeight: 800, fontSize: "1.1rem", color: "var(--in)", marginTop: "2px" }}>
                {roadOwner.name}
              </div>
              <div className="mu" style={{ fontSize: "0.82rem", marginTop: "4px" }}>
                {roadOwner.note}
              </div>
            </div>
          </div>

          {/* Location & Ward */}
          <div className="box" style={{ marginTop: "12px", padding: "14px" }}>
            <div className="mu" style={{ fontSize: "0.8rem", fontWeight: 600, textTransform: "uppercase" }}>
              Location & MBMC Ward Jurisdiction
            </div>
            <div style={{ fontWeight: 700, fontSize: "1rem", marginTop: "4px" }}>
              📍 {complaint.location?.address}
            </div>
            <div style={{ fontSize: "0.88rem", color: "var(--mu)", marginTop: "6px" }}>
              <strong>{ward.name}</strong> · {ward.office}
            </div>
            {complaint.location?.geo && (
              <div className="tk" style={{ fontSize: "0.8rem", color: "var(--mu)", marginTop: "4px" }}>
                Geo-coords: {complaint.location.geo.lat.toFixed(5)}, {complaint.location.geo.lng.toFixed(5)}
              </div>
            )}
          </div>

          {/* Description */}
          <div className="box" style={{ marginTop: "12px", padding: "14px" }}>
            <div className="mu" style={{ fontSize: "0.8rem", fontWeight: 600, textTransform: "uppercase" }}>
              Citizen Description
            </div>
            <p style={{ marginTop: "6px", fontSize: "0.95rem", lineHeight: 1.55 }}>
              "{complaint.description}"
            </p>
          </div>

          {/* Official Audit Timeline */}
          <div className="box" style={{ marginTop: "12px", padding: "16px", background: "var(--sf)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
              <div style={{ fontWeight: 800, fontSize: "1.05rem" }}>
                📋 {t("timelineTitle")}
              </div>
              <span className="tag" style={{ fontSize: "0.72rem" }}>
                {updates.length} {updates.length === 1 ? "Event" : "Events"}
              </span>
            </div>

            <div className="timeline-container">
              {updates.map((u, idx) => (
                <div key={u.id || idx} className="timeline-item">
                  <div className="timeline-dot" />
                  <div className="timeline-card">
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "6px" }}>
                      <span style={{ fontWeight: 700, fontSize: "0.9rem", color: "var(--ink)" }}>
                        {u.toStatus?.toUpperCase() || "UPDATE"}
                      </span>
                      <span className="mu" style={{ fontSize: "0.78rem" }}>
                        {new Date(u.createdAt).toLocaleString("en-IN", {
                          day: "numeric",
                          month: "short",
                          hour: "2-digit",
                          minute: "2-digit"
                        })}
                      </span>
                    </div>
                    <div style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--in)", marginTop: "2px" }}>
                      By: {u.actorRole || "System"}
                    </div>
                    {u.note && (
                      <p style={{ fontSize: "0.88rem", marginTop: "4px", color: "var(--ink)" }}>
                        {u.note}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="modal-footer">
          <button
            className="vote"
            aria-pressed={hasUpvoted}
            onClick={() => onUpvote(complaint.id)}
            style={{ minHeight: "44px" }}
          >
            👍 {t("me2")} · {complaint.upvoteCount || 0}
          </button>
          <button className="btn" onClick={onClose}>
            {t("close")}
          </button>
        </div>
      </div>
    </div>
  );
}
