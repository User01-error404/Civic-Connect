import React from "react";
import HeroIllustration from "../components/HeroIllustration";
import { SEED_DATA } from "../data/seedData";

export default function HomeView({ complaints = [], setActiveView, t }) {
  const total = complaints.length;
  const openCount = complaints.filter((c) => c.status !== "resolved").length;
  const resolvedCount = complaints.filter((c) => c.status === "resolved").length;

  return (
    <section className="v view-home">
      {/* Hero Section */}
      <div className="hero" style={{ position: "relative", overflow: "hidden" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "24px", alignItems: "center" }} className="hero-grid">
          <div>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "12px" }}>
              <span className="tag" style={{ background: "var(--y)", color: "#17181C" }}>
                {t("smartBadge")}
              </span>
              <span className="tag" style={{ background: "rgba(255,255,255,0.15)", color: "#fff" }}>
                {t("demoBadge")}
              </span>
            </div>

            <h1 tabIndex={-1} style={{ margin: "0 0 14px", lineHeight: 1.15 }}>
              {t("h1")}
            </h1>
            <p style={{ color: "#C9CBD1", maxWidth: "48ch", marginBottom: "24px", fontSize: "1.05rem" }}>
              {t("sub")}
            </p>

            <div className="btns">
              <button
                type="button"
                className="btn"
                onClick={() => setActiveView("report")}
                style={{ fontSize: "1.05rem", padding: "0 24px" }}
              >
                🚧 {t("cta")}
              </button>
              <button
                type="button"
                className="btn o"
                onClick={() => setActiveView("track")}
                style={{ fontSize: "1.05rem", padding: "0 20px" }}
              >
                📍 {t("cta2")}
              </button>
            </div>
          </div>

          <div style={{ maxWidth: "520px", justifySelf: "center", width: "100%" }}>
            <HeroIllustration />
          </div>
        </div>

        <div className="lane" style={{ marginTop: "28px" }} />
      </div>

      {/* 3 Step Features */}
      <div className="grid c3" style={{ marginTop: "24px" }}>
        <div className="box" style={{ position: "relative", overflow: "hidden" }}>
          <span className="tag">Step 1</span>
          <h3 style={{ fontSize: "1.2rem", margin: "10px 0 6px" }}>📸 {t("s1")}</h3>
          <p className="mu">{t("s1d")}</p>
        </div>
        <div className="box" style={{ position: "relative", overflow: "hidden" }}>
          <span className="tag">Step 2</span>
          <h3 style={{ fontSize: "1.2rem", margin: "10px 0 6px" }}>📍 {t("s2")}</h3>
          <p className="mu">{t("s2d")}</p>
        </div>
        <div className="box" style={{ position: "relative", overflow: "hidden" }}>
          <span className="tag">Step 3</span>
          <h3 style={{ fontSize: "1.2rem", margin: "10px 0 6px" }}>🔍 {t("s3")}</h3>
          <p className="mu">{t("s3d")}</p>
        </div>
      </div>

      {/* Live Statistics */}
      <div className="sec">
        <div className="row">
          <h2>📊 City Damage Summary</h2>
          <span className="tag" style={{ background: "var(--sf)", border: "1px solid var(--ln)" }}>
            Live Sync
          </span>
        </div>
        <div className="grid c4" style={{ marginTop: "16px" }}>
          <div className="box">
            <div className="num">{total}</div>
            <div className="mu">{t("statsTotal")}</div>
          </div>
          <div className="box">
            <div className="num" style={{ color: "var(--wa)" }}>{openCount}</div>
            <div className="mu">{t("statsOpen")}</div>
          </div>
          <div className="box">
            <div className="num" style={{ color: "var(--ok)" }}>{resolvedCount}</div>
            <div className="mu">{t("statsFixed")}</div>
          </div>
          <div className="box">
            <div className="num" style={{ color: "var(--in)" }}>4</div>
            <div className="mu">{t("statsAgencies")}</div>
          </div>
        </div>
      </div>

      {/* Multi-Agency Routing Spotlight Card */}
      <div className="box" style={{ marginTop: "28px", padding: "24px", background: "var(--sf)", border: "2px solid var(--y)" }}>
        <div className="row" style={{ alignItems: "flex-start" }}>
          <div>
            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
              <span style={{ fontSize: "1.5rem" }}>🛣️</span>
              <h3 style={{ fontSize: "1.25rem", margin: 0 }}>
                Why Multi-Agency Routing is CivicConnect's Core Innovation
              </h3>
            </div>
            <p style={{ margin: "8px 0 16px", color: "var(--mu)", maxWidth: "80ch" }}>
              In Mira-Bhayandar, road repairs fail when complaints are filed with the wrong authority. CivicConnect categorizes and routes complaints directly to the legal maintenance owner:
            </p>
          </div>
        </div>

        <div className="grid c2" style={{ gap: "12px", marginTop: "10px" }}>
          {SEED_DATA.roadOwners.map((owner) => (
            <div
              key={owner.id}
              style={{
                padding: "12px 14px",
                borderRadius: "12px",
                background: "var(--bg)",
                border: "1px solid var(--ln)"
              }}
            >
              <div style={{ fontWeight: 800, fontSize: "0.95rem", color: "var(--ink)" }}>
                {owner.name} ({owner.type.toUpperCase()})
              </div>
              <div className="mu" style={{ fontSize: "0.82rem", marginTop: "4px" }}>
                {owner.note}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
