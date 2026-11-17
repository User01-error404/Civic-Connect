import React, { useState } from "react";
import { SEED_DATA } from "../data/seedData";

export default function StaffDashboard({
  complaints = [],
  onUpdateStatus,
  onSelectComplaint,
  t
}) {
  const [selectedWard, setSelectedWard] = useState("all");
  const [selectedAgency, setSelectedAgency] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const [activeComplaintId, setActiveComplaintId] = useState(complaints[0]?.id || "");
  const [newStatus, setNewStatus] = useState("in_progress");
  const [actorRole, setActorRole] = useState("Ward Officer");
  const [statusNote, setStatusNote] = useState("");
  const [feedbackMsg, setFeedbackMsg] = useState("");

  const activeComplaint = complaints.find((c) => c.id === activeComplaintId);

  // Filter complaints
  const filtered = complaints.filter((c) => {
    if (selectedWard !== "all" && c.wardId !== selectedWard) return false;
    if (selectedAgency !== "all" && c.roadOwnerId !== selectedAgency) return false;
    if (selectedStatus !== "all" && c.status !== selectedStatus) return false;
    return true;
  });

  // Calculate statistics
  const total = complaints.length;
  const mbmcCount = complaints.filter((c) => c.roadOwnerId === "mbmc").length;
  const mmrdaCount = complaints.filter((c) => c.roadOwnerId === "mmrda").length;
  const statePwdCount = complaints.filter((c) => c.roadOwnerId === "pwd_state").length;
  const nhaiCount = complaints.filter((c) => c.roadOwnerId === "nhai").length;

  const handleApplyUpdate = async (e) => {
    e.preventDefault();
    if (!activeComplaintId) return;

    await onUpdateStatus(
      activeComplaintId,
      newStatus,
      statusNote.trim() || `Status updated to ${newStatus} by ${actorRole}.`,
      actorRole
    );

    setFeedbackMsg(`Ticket ${activeComplaint?.ticketNo || activeComplaintId} updated to ${newStatus}!`);
    setStatusNote("");
    setTimeout(() => setFeedbackMsg(""), 4000);
  };

  return (
    <div className="staff-portal-view">
      {/* Header */}
      <div className="row" style={{ alignItems: "flex-start", marginBottom: "20px" }}>
        <div>
          <h1 className="pt" style={{ margin: 0 }}>
            🏛️ {t("staffTitle")}
          </h1>
          <p className="mu" style={{ margin: "4px 0 0" }}>
            {t("staffSub")} · Mira-Bhayandar Municipal Corporation
          </p>
        </div>
        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <span className="tag" style={{ background: "var(--ink)", color: "var(--y)" }}>
            Officer Console
          </span>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid c4" style={{ gap: "12px", marginBottom: "24px" }}>
        <div className="box" style={{ padding: "16px" }}>
          <div className="mu" style={{ fontSize: "0.8rem", fontWeight: 700 }}>MBMC MUNICIPAL</div>
          <div className="num" style={{ fontSize: "1.9rem", color: "var(--in)" }}>{mbmcCount}</div>
          <div className="mu" style={{ fontSize: "0.75rem" }}>City roads & internal wards</div>
        </div>
        <div className="box" style={{ padding: "16px" }}>
          <div className="mu" style={{ fontSize: "0.8rem", fontWeight: 700 }}>MMRDA METRO 9</div>
          <div className="num" style={{ fontSize: "1.9rem", color: "#B45309" }}>{mmrdaCount}</div>
          <div className="mu" style={{ fontSize: "0.75rem" }}>Metro corridor maintenance</div>
        </div>
        <div className="box" style={{ padding: "16px" }}>
          <div className="mu" style={{ fontSize: "0.8rem", fontWeight: 700 }}>STATE PWD</div>
          <div className="num" style={{ fontSize: "1.9rem", color: "#7C3AED" }}>{statePwdCount}</div>
          <div className="mu" style={{ fontSize: "0.75rem" }}>Ghodbunder arterial road</div>
        </div>
        <div className="box" style={{ padding: "16px" }}>
          <div className="mu" style={{ fontSize: "0.8rem", fontWeight: 700 }}>NHAI HIGHWAY</div>
          <div className="num" style={{ fontSize: "1.9rem", color: "#DC2626" }}>{nhaiCount}</div>
          <div className="mu" style={{ fontSize: "0.75rem" }}>National highway stretches</div>
        </div>
      </div>

      {/* Main 2-column layout: Queue on Left, Update Form on Right */}
      <div className="grid c2" style={{ gap: "20px", alignItems: "start" }}>
        {/* Left Column: Complaint Queue & Filters */}
        <div className="box" style={{ padding: "20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
            <h3 style={{ margin: 0, fontSize: "1.15rem" }}>
              Complaints Queue ({filtered.length})
            </h3>
          </div>

          {/* Filters Bar */}
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "16px" }}>
            <select
              value={selectedAgency}
              onChange={(e) => setSelectedAgency(e.target.value)}
              style={{ flex: 1, minHeight: "40px", fontSize: "0.88rem", padding: "8px" }}
            >
              <option value="all">All Agencies</option>
              <option value="mbmc">MBMC Only</option>
              <option value="mmrda">MMRDA (Metro)</option>
              <option value="pwd_state">State PWD (Ghodbunder)</option>
              <option value="nhai">NHAI</option>
            </select>

            <select
              value={selectedWard}
              onChange={(e) => setSelectedWard(e.target.value)}
              style={{ flex: 1, minHeight: "40px", fontSize: "0.88rem", padding: "8px" }}
            >
              <option value="all">All Wards (1-6)</option>
              {SEED_DATA.wards.map((w) => (
                <option key={w.id} value={w.id}>
                  {w.name}
                </option>
              ))}
            </select>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              style={{ flex: 1, minHeight: "40px", fontSize: "0.88rem", padding: "8px" }}
            >
              <option value="all">All Statuses</option>
              <option value="submitted">Submitted</option>
              <option value="acknowledged">Acknowledged</option>
              <option value="assigned">Assigned</option>
              <option value="in_progress">In Progress</option>
              <option value="resolved">Resolved</option>
            </select>
          </div>

          {/* Queue List */}
          <div style={{ display: "flex", flexDirection: "column", gap: "10px", maxHeight: "540px", overflowY: "auto", paddingRight: "4px" }}>
            {filtered.map((c) => {
              const isSelected = c.id === activeComplaintId;
              return (
                <div
                  key={c.id}
                  onClick={() => setActiveComplaintId(c.id)}
                  style={{
                    padding: "12px 14px",
                    borderRadius: "12px",
                    border: isSelected ? "2px solid var(--y)" : "1.5px solid var(--ln)",
                    background: isSelected ? "var(--bg)" : "var(--sf)",
                    cursor: "pointer",
                    transition: "all 0.15s ease"
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span className="tk" style={{ fontWeight: 700, fontSize: "0.85rem" }}>
                      {c.ticketNo}
                    </span>
                    <span
                      className="chip"
                      style={{
                        fontSize: "0.72rem",
                        padding: "2px 8px",
                        borderColor: "currentColor"
                      }}
                    >
                      {c.status.replace("_", " ")}
                    </span>
                  </div>

                  <div style={{ fontWeight: 700, fontSize: "0.95rem", margin: "4px 0 2px" }}>
                    {t("sub_" + c.subcategory) || c.subcategory} · {c.location?.address}
                  </div>

                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "6px" }}>
                    <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--in)" }}>
                      Agency: {c.roadOwnerId?.toUpperCase()}
                    </span>
                    <span className="mu" style={{ fontSize: "0.75rem" }}>
                      {new Date(c.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Live Status Action Panel */}
        <div className="box" style={{ padding: "20px" }}>
          <h3 style={{ margin: "0 0 14px", fontSize: "1.15rem" }}>
            ⚡ Action Console: Update Complaint
          </h3>

          {activeComplaint ? (
            <form onSubmit={handleApplyUpdate}>
              <div style={{ padding: "12px", background: "var(--bg)", borderRadius: "12px", marginBottom: "16px" }}>
                <div className="row">
                  <span className="tk" style={{ fontWeight: 700, fontSize: "1rem" }}>
                    {activeComplaint.ticketNo}
                  </span>
                  <span className="tag" style={{ textTransform: "uppercase", fontSize: "0.72rem" }}>
                    Current: {activeComplaint.status}
                  </span>
                </div>
                <div style={{ fontWeight: 700, marginTop: "6px" }}>
                  {activeComplaint.location?.address}
                </div>
                <div className="mu" style={{ fontSize: "0.85rem", marginTop: "4px" }}>
                  Assigned Owner: <strong>{activeComplaint.roadOwnerId?.toUpperCase()}</strong> · Ward: <strong>{activeComplaint.wardId?.toUpperCase()}</strong>
                </div>
                <button
                  type="button"
                  onClick={() => onSelectComplaint(activeComplaint)}
                  className="btn o"
                  style={{ marginTop: "10px", padding: "4px 12px", minHeight: "34px", fontSize: "0.82rem" }}
                >
                  Inspect Full Audit Timeline &rarr;
                </button>
              </div>

              {/* Status Picker */}
              <label className="f" style={{ marginTop: 0 }}>
                {t("selectNewStatus")}
              </label>
              <select
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
                style={{ marginBottom: "14px" }}
              >
                <option value="submitted">1. Submitted (Pending Review)</option>
                <option value="acknowledged">2. Acknowledged (Jurisdiction Confirmed)</option>
                <option value="assigned">3. Assigned (Work Order Issued)</option>
                <option value="in_progress">4. In Progress (Crew on Site)</option>
                <option value="resolved">5. Resolved (Repair Completed & Inspected)</option>
              </select>

              {/* Actor Role Picker */}
              <label className="f">{t("staffSim")}</label>
              <select
                value={actorRole}
                onChange={(e) => setActorRole(e.target.value)}
                style={{ marginBottom: "14px" }}
              >
                <option value="MBMC Ward Officer">MBMC Ward Officer (Field Inspection)</option>
                <option value="MBMC PWD Admin">MBMC PWD Admin (Work Orders)</option>
                <option value="MMRDA Metro Liaison">MMRDA Metro Corridor Liaison</option>
                <option value="State PWD Engineer">Maharashtra State PWD Engineer</option>
                <option value="Road Repair Contractor">Pothole Repair Contractor (Mastic Unit)</option>
              </select>

              {/* Resolution / Progress Note */}
              <label className="f">{t("officialNoteL")}</label>
              <textarea
                value={statusNote}
                onChange={(e) => setStatusNote(e.target.value)}
                placeholder={t("notePlaceholder")}
                style={{ minHeight: "100px", marginBottom: "16px" }}
              />

              {feedbackMsg && (
                <div style={{
                  padding: "10px 14px",
                  borderRadius: "10px",
                  background: "#F0FDF4",
                  border: "1.5px solid #86EFAC",
                  color: "#166534",
                  fontWeight: 600,
                  fontSize: "0.9rem",
                  marginBottom: "14px"
                }}>
                  ✅ {feedbackMsg}
                </div>
              )}

              <button type="submit" className="btn" style={{ width: "100%" }}>
                {t("updateStatusBtn")}
              </button>
            </form>
          ) : (
            <p className="mu">Select a complaint from the queue on the left to review and update its status.</p>
          )}
        </div>
      </div>
    </div>
  );
}
