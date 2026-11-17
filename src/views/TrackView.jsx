import React, { useState } from "react";
import MapView from "../components/MapView";
import { SEED_DATA } from "../data/seedData";

export default function TrackView({
  complaints = [],
  onSelectComplaint,
  onUpvote,
  userVotes = [],
  t
}) {
  const [statusFilter, setStatusFilter] = useState("all");
  const [agencyFilter, setAgencyFilter] = useState("all");
  const [wardFilter, setWardFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("split"); // 'split', 'grid', 'map'

  // Filter complaints
  const filtered = complaints.filter((c) => {
    if (statusFilter !== "all" && c.status !== statusFilter) return false;
    if (agencyFilter !== "all" && c.roadOwnerId !== agencyFilter) return false;
    if (wardFilter !== "all" && c.wardId !== wardFilter) return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTicket = c.ticketNo?.toLowerCase().includes(q);
      const matchAddress = c.location?.address?.toLowerCase().includes(q);
      const matchDesc = c.description?.toLowerCase().includes(q);
      const matchSub = c.subcategory?.toLowerCase().includes(q);
      if (!matchTicket && !matchAddress && !matchDesc && !matchSub) return false;
    }
    return true;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "submitted": return "var(--mu)";
      case "acknowledged": return "var(--in)";
      case "assigned": return "#7C3AED";
      case "in_progress": return "var(--wa)";
      case "resolved": return "var(--ok)";
      default: return "var(--mu)";
    }
  };

  const getStatusStepIndex = (status) => {
    switch (status) {
      case "submitted": return 0;
      case "acknowledged": return 1;
      case "assigned": return 1;
      case "in_progress": return 2;
      case "resolved": return 3;
      default: return 0;
    }
  };

  return (
    <section className="v view-track">
      {/* Title & View Switcher */}
      <div className="row" style={{ alignItems: "center", marginBottom: "16px" }}>
        <div>
          <h1 className="pt" tabIndex={-1} style={{ margin: 0 }}>
            {t("trackTitle")}
          </h1>
          <p className="mu" style={{ margin: "4px 0 0" }}>
            {t("trackSub")} ({filtered.length} found)
          </p>
        </div>

        {/* View Mode Switcher */}
        <div className="seg" role="group" aria-label="View Mode">
          <button
            type="button"
            onClick={() => setViewMode("split")}
            aria-pressed={viewMode === "split"}
          >
            📱 {t("viewSplit")}
          </button>
          <button
            type="button"
            onClick={() => setViewMode("map")}
            aria-pressed={viewMode === "map"}
          >
            🗺️ {t("viewMap")}
          </button>
          <button
            type="button"
            onClick={() => setViewMode("grid")}
            aria-pressed={viewMode === "grid"}
          >
            📋 {t("viewGrid")}
          </button>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "16px" }}>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={t("searchP")}
          style={{ flex: 2, minWidth: "220px", minHeight: "44px" }}
        />

        <select
          value={agencyFilter}
          onChange={(e) => setAgencyFilter(e.target.value)}
          style={{ flex: 1, minWidth: "160px", minHeight: "44px" }}
        >
          <option value="all">All Agencies</option>
          <option value="mbmc">MBMC City Roads</option>
          <option value="mmrda">MMRDA (Metro 9)</option>
          <option value="pwd_state">State PWD (Ghodbunder)</option>
          <option value="nhai">NHAI Highway</option>
        </select>

        <select
          value={wardFilter}
          onChange={(e) => setWardFilter(e.target.value)}
          style={{ flex: 1, minWidth: "160px", minHeight: "44px" }}
        >
          <option value="all">All Wards (1 to 6)</option>
          {SEED_DATA.wards.map((w) => (
            <option key={w.id} value={w.id}>
              {w.name}
            </option>
          ))}
        </select>
      </div>

      {/* Status Chips Filter */}
      <div className="chips" style={{ margin: "0 0 20px" }}>
        {[
          { key: "all", label: t("all") },
          { key: "submitted", label: t("s_submitted") },
          { key: "acknowledged", label: t("s_acknowledged") },
          { key: "in_progress", label: t("s_in_progress") },
          { key: "resolved", label: t("s_resolved") }
        ].map((f) => (
          <button
            key={f.key}
            type="button"
            className="fb"
            data-f={f.key}
            aria-pressed={statusFilter === f.key}
            onClick={() => setStatusFilter(f.key)}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Map View Mode */}
      {viewMode === "map" && (
        <div style={{ marginBottom: "20px" }}>
          <MapView
            complaints={filtered}
            onSelectComplaint={onSelectComplaint}
            height="560px"
          />
        </div>
      )}

      {/* Split View Mode (Map + List side-by-side on desktop) */}
      {viewMode === "split" && (
        <div className="grid c2" style={{ gap: "20px", alignItems: "start", marginBottom: "20px" }}>
          <div style={{ position: "sticky", top: "80px" }}>
            <MapView
              complaints={filtered}
              onSelectComplaint={onSelectComplaint}
              height="520px"
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "14px", maxHeight: "560px", overflowY: "auto", paddingRight: "4px" }}>
            {filtered.length === 0 ? (
              <div className="box" style={{ textAlign: "center", padding: "30px" }}>
                <p className="mu">{t("noResults")}</p>
              </div>
            ) : (
              filtered.map((c) => renderCard(c))
            )}
          </div>
        </div>
      )}

      {/* Grid View Mode */}
      {viewMode === "grid" && (
        <div className="grid c3" style={{ marginTop: 0 }}>
          {filtered.length === 0 ? (
            <div className="box" style={{ gridColumn: "1/-1", textAlign: "center", padding: "40px" }}>
              <p className="mu">{t("noResults")}</p>
            </div>
          ) : (
            filtered.map((c) => renderCard(c))
          )}
        </div>
      )}
    </section>
  );

  function renderCard(c) {
    const hasVoted = userVotes.includes(c.id);
    const wardObj = SEED_DATA.wards.find((w) => w.id === c.wardId);
    const ownerObj = SEED_DATA.roadOwners.find((o) => o.id === c.roadOwnerId);
    const stepIdx = getStatusStepIndex(c.status);
    const isResolved = c.status === "resolved";

    return (
      <article key={c.id} className="card">
        {/* Photo Thumbnail */}
        <div
          className="ph"
          role="img"
          aria-label={c.subcategory}
          style={
            c.photoBase64
              ? { backgroundImage: `url('${c.photoBase64}')`, backgroundSize: "cover" }
              : undefined
          }
          onClick={() => onSelectComplaint(c)}
        />

        <div className="cb">
          {/* Header Row */}
          <div className="row">
            <span className="tk" style={{ fontWeight: 700 }}>
              {c.ticketNo}
            </span>
            <span
              className="chip"
              style={{
                borderColor: getStatusColor(c.status),
                color: getStatusColor(c.status),
                fontSize: "0.74rem"
              }}
            >
              {c.status.replace("_", " ")}
            </span>
          </div>

          {/* Subcategory & Address */}
          <h3
            style={{ cursor: "pointer", fontSize: "1.1rem" }}
            onClick={() => onSelectComplaint(c)}
          >
            {t("sub_" + c.subcategory) || c.subcategory}
          </h3>

          <p className="mu" style={{ fontSize: "0.88rem", margin: "0 0 4px" }}>
            <strong>{wardObj?.name || c.wardId}</strong> · {c.location?.address}
          </p>

          {/* Road Owner Tag */}
          <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
            <span
              style={{
                fontSize: "0.72rem",
                fontWeight: 700,
                padding: "2px 8px",
                borderRadius: "6px",
                background: "var(--bg)",
                border: "1px solid var(--ln)",
                color: "var(--in)"
              }}
            >
              Authority: {ownerObj?.shortName || c.roadOwnerId?.toUpperCase()}
            </span>
            {c.isSample && (
              <span className="tag" style={{ fontSize: "0.68rem", padding: "2px 6px" }}>
                Sample
              </span>
            )}
          </div>

          {/* Status Progress Lane */}
          <div
            className={`lp${isResolved ? " d" : ""}`}
            role="img"
            aria-label={`Status step ${stepIdx + 1} of 4`}
            style={{ margin: "6px 0" }}
          >
            {[0, 1, 2, 3].map((i) => (
              <i key={i} className={i <= stepIdx ? "on" : ""} />
            ))}
          </div>

          {/* Footer Row */}
          <div className="row" style={{ marginTop: "6px" }}>
            <span className="mu" style={{ fontSize: "0.82rem" }}>
              {new Date(c.createdAt).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short"
              })}
            </span>
            <div style={{ display: "flex", gap: "8px" }}>
              <button
                type="button"
                className="vote"
                aria-pressed={hasVoted}
                onClick={(e) => {
                  e.stopPropagation();
                  onUpvote(c.id);
                }}
              >
                👍 {t("me2")} · {c.upvoteCount || 0}
              </button>
              <button
                type="button"
                className="btn o"
                onClick={() => onSelectComplaint(c)}
                style={{ padding: "0 10px", minHeight: "44px", fontSize: "0.85rem" }}
              >
                Timeline &rarr;
              </button>
            </div>
          </div>
        </div>
      </article>
    );
  }
}
