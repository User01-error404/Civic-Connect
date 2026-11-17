import React from "react";
import { SEED_DATA } from "../data/seedData";

export default function HelpView({ t }) {
  const contacts = SEED_DATA.config.contacts;

  return (
    <section className="v view-help">
      <h1 className="pt" tabIndex={-1}>
        📞 {t("hTitle")}
      </h1>
      <p className="mu" style={{ maxWidth: "70ch", marginBottom: "28px" }}>
        {t("hSub")}
      </p>

      {/* Emergency Quick Dials */}
      <div style={{ marginBottom: "28px" }}>
        <h2 style={{ fontSize: "1.25rem", marginBottom: "14px" }}>
          🚨 {t("emergencyHeader")}
        </h2>
        <div className="grid c3" style={{ marginTop: 0 }}>
          <div className="box ph2">
            <div>
              <a href="tel:112" style={{ color: "#DC2626", fontWeight: 800 }}>112</a>
              <div className="mu">National Emergency Police / Disaster</div>
            </div>
          </div>
          <div className="box ph2">
            <div>
              <a href="tel:108" style={{ color: "var(--in)", fontWeight: 800 }}>108</a>
              <div className="mu">Medical Emergency / Ambulance</div>
            </div>
          </div>
          <div className="box ph2">
            <div>
              <a href="tel:101" style={{ color: "#D97706", fontWeight: 800 }}>101</a>
              <div className="mu">Fire & Rescue Services</div>
            </div>
          </div>
        </div>
      </div>

      {/* Official MBMC Municipal Helplines (Verified) */}
      <div style={{ marginBottom: "32px" }}>
        <div className="row" style={{ alignItems: "center", marginBottom: "14px" }}>
          <h2 style={{ fontSize: "1.25rem", margin: 0 }}>
            🏛️ {t("mbmcHeader")}
          </h2>
          <span className="tag" style={{ background: "var(--y)", color: "#17181C" }}>
            Source: mbmc.gov.in
          </span>
        </div>

        <div className="grid c2" style={{ marginTop: 0, gap: "16px" }}>
          <div className="box" style={{ padding: "18px" }}>
            <div className="mu" style={{ fontSize: "0.82rem", fontWeight: 700, textTransform: "uppercase" }}>
              {t("tollFreeL")}
            </div>
            <a
              href="tel:1800224849"
              style={{ font: '800 1.6rem "Bricolage Grotesque", sans-serif', color: "var(--in)", display: "block", margin: "6px 0 4px", textDecoration: "none" }}
            >
              1800 224 849
            </a>
            <p className="mu" style={{ fontSize: "0.85rem", margin: 0 }}>
              Official 24/7 toll-free citizen grievance hotline for road, water and municipal repairs.
            </p>
          </div>

          <div className="box" style={{ padding: "18px" }}>
            <div className="mu" style={{ fontSize: "0.82rem", fontWeight: 700, textTransform: "uppercase" }}>
              {t("headOfficeL")}
            </div>
            <div style={{ display: "flex", gap: "16px", margin: "6px 0 4px" }}>
              <a
                href="tel:02228192828"
                style={{ font: '800 1.4rem "Bricolage Grotesque", sans-serif', color: "var(--ink)", textDecoration: "none" }}
              >
                022-2819 2828
              </a>
              <a
                href="tel:02228193028"
                style={{ font: '800 1.4rem "Bricolage Grotesque", sans-serif', color: "var(--ink)", textDecoration: "none" }}
              >
                022-2819 3028
              </a>
            </div>
            <p className="mu" style={{ fontSize: "0.85rem", margin: 0 }}>
              Direct PBX exchange connecting to Municipal Commissioner & PWD executive engineers.
            </p>
          </div>

          <div className="box" style={{ padding: "18px" }}>
            <div className="mu" style={{ fontSize: "0.82rem", fontWeight: 700, textTransform: "uppercase" }}>
              {t("pwdEmailL")}
            </div>
            <a
              href="mailto:pwd@mbmc.gov.in"
              style={{ font: '700 1.15rem inherit', color: "var(--in)", display: "block", margin: "6px 0 4px" }}
            >
              pwd@mbmc.gov.in
            </a>
            <p className="mu" style={{ fontSize: "0.85rem", margin: 0 }}>
              Direct mailbox of the Public Works Department for asphalt, concretisation, and contractor tenders.
            </p>
          </div>

          <div className="box" style={{ padding: "18px" }}>
            <div className="mu" style={{ fontSize: "0.82rem", fontWeight: 700, textTransform: "uppercase" }}>
              {t("hqAddressL")}
            </div>
            <p style={{ fontWeight: 700, margin: "6px 0 4px", fontSize: "0.95rem" }}>
              {contacts.headOffice}
            </p>
            <p className="mu" style={{ fontSize: "0.82rem", margin: 0 }}>
              Near CSM Road, Bhayandar West, Thane District 401101
            </p>
          </div>
        </div>
      </div>

      {/* Directory of 6 Ward Committee Offices */}
      <div>
        <h2 style={{ fontSize: "1.25rem", marginBottom: "14px" }}>
          🏢 {t("wardHeader")}
        </h2>
        <div className="grid c3" style={{ marginTop: 0, gap: "16px" }}>
          {SEED_DATA.wards.map((ward) => (
            <div key={ward.id} className="box" style={{ padding: "18px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span className="tag">Ward {ward.no}</span>
                <span className="tk" style={{ fontSize: "0.78rem" }}>{ward.id}</span>
              </div>
              <h3 style={{ fontSize: "1.15rem", margin: "10px 0 6px" }}>
                {ward.name}
              </h3>
              <p className="mu" style={{ fontSize: "0.85rem", margin: "0 0 10px" }}>
                <strong>Area:</strong> {ward.area}
              </p>
              <div style={{ borderTop: "1px solid var(--ln)", paddingTop: "8px", fontSize: "0.85rem" }}>
                <div style={{ fontWeight: 600, color: "var(--ink)", marginBottom: "4px" }}>
                  📍 {ward.office}
                </div>
                {ward.email ? (
                  <a href={`mailto:${ward.email}`} style={{ color: "var(--in)", fontSize: "0.82rem", textDecoration: "none" }}>
                    ✉️ {ward.email}
                  </a>
                ) : (
                  <span className="mu" style={{ fontSize: "0.8rem", fontStyle: "italic" }}>
                    Inquiries routed via Central MBMC Desk
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
