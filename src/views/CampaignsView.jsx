import React from "react";
import { SEED_DATA } from "../data/seedData";

export default function CampaignsView({ lang, t }) {
  return (
    <section className="v view-campaigns">
      <div className="row" style={{ alignItems: "center", marginBottom: "8px" }}>
        <h1 className="pt" tabIndex={-1} style={{ margin: 0 }}>
          📢 {t("cTitle")}
        </h1>
        <span className="tag">Municipal Drives</span>
      </div>
      <p className="mu" style={{ margin: "0 0 24px", maxWidth: "70ch" }}>
        {t("cSub")}
      </p>

      <div className="grid c3" style={{ marginTop: 0 }}>
        {SEED_DATA.campaigns.map((camp, idx) => {
          const title = camp.title?.[lang] || camp.title?.en || "Campaign";
          const body = camp.body?.[lang] || camp.body?.en || "";
          const wardNames = camp.wardIds.map(
            (wid) => SEED_DATA.wards.find((w) => w.id === wid)?.name || wid
          );

          return (
            <article key={camp.id} className="box" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                  <span className="tag" style={{ background: idx === 0 ? "var(--y)" : "var(--bg)", border: "1px solid var(--ln)" }}>
                    {camp.type === "road_repair" ? "🛣️ Road Repair" : "🧹 Cleanliness"}
                  </span>
                  <span className="mu" style={{ fontSize: "0.78rem" }}>
                    Week 46 · Nov 2026
                  </span>
                </div>

                <h3 style={{ fontSize: "1.2rem", margin: "8px 0" }}>
                  {title}
                </h3>
                <p className="mu" style={{ fontSize: "0.9rem", lineHeight: 1.55 }}>
                  {body}
                </p>

                {wardNames.length > 0 && (
                  <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginTop: "10px" }}>
                    {wardNames.map((w) => (
                      <span key={w} style={{ fontSize: "0.72rem", background: "var(--bg)", border: "1px solid var(--ln)", padding: "2px 8px", borderRadius: "99px" }}>
                        📍 {w}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div style={{ marginTop: "20px", paddingTop: "14px", borderTop: "1px solid var(--ln)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", fontWeight: 700, marginBottom: "6px" }}>
                  <span>Progress</span>
                  <span style={{ color: "var(--in)" }}>{camp.progress}%</span>
                </div>
                <div className="bar8" role="img" aria-label={`${camp.progress}% completed`}>
                  <b style={{ width: `${camp.progress}%` }} />
                </div>
                <div className="mu" style={{ fontSize: "0.82rem", marginTop: "6px" }}>
                  {camp.targetText}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
