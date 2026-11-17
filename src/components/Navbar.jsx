import React from "react";

export default function Navbar({
  activeView,
  setActiveView,
  lang,
  setLang,
  isDark,
  setIsDark,
  isLive,
  onOpenFirebaseModal,
  onOpenInvigilatorModal,
  t
}) {
  const navItems = [
    { key: "home", label: t("home") },
    { key: "report", label: t("report") },
    { key: "track", label: t("track") },
    { key: "campaigns", label: t("campaigns") },
    { key: "help", label: t("help") },
    { key: "staff", label: t("staff") }
  ];

  return (
    <header className="site-header">
      <div className="bar">
        {/* Brand */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            setActiveView("home");
          }}
          className="brand"
        >
          <span className="mk" aria-hidden="true" />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1.1 }}>
              CivicConnect
            </span>
            <span className="mu" style={{ fontSize: "0.68rem", fontWeight: 600 }}>
              MBMC Road Portal
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="tn" aria-label="Main Navigation">
          {navItems.map((item) => (
            <a
              key={item.key}
              href={`#${item.key}`}
              onClick={(e) => {
                e.preventDefault();
                setActiveView(item.key);
              }}
              aria-current={activeView === item.key ? "page" : undefined}
            >
              {item.key === "staff" ? `🏛️ ${item.label}` : item.label}
            </a>
          ))}
        </nav>

        {/* Right Controls */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          {/* Invigilator Demo Guide Pill */}
          <button
            type="button"
            className="btn o"
            onClick={onOpenInvigilatorModal}
            title="Invigilator 3-Minute Demo Script"
            style={{
              minHeight: "36px",
              padding: "0 10px",
              fontSize: "0.78rem",
              borderRadius: "99px",
              background: "var(--y)",
              color: "#17181C",
              borderColor: "#17181C",
              fontWeight: 700
            }}
          >
            🎓 Demo Script
          </button>

          {/* Firebase Status Pill */}
          <button
            type="button"
            className="btn o"
            onClick={onOpenFirebaseModal}
            title={isLive ? "Connected to Firebase Firestore" : "Running in Local Demo Mode"}
            style={{
              minHeight: "36px",
              padding: "0 10px",
              fontSize: "0.78rem",
              borderRadius: "99px",
              display: "flex",
              alignItems: "center",
              gap: "5px"
            }}
          >
            <span
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: isLive ? "#16A34A" : "#D97706"
              }}
            />
            <span>{isLive ? "Firebase" : "Demo Mode"}</span>
          </button>

          {/* Language Switcher */}
          <div className="seg" role="group" aria-label="Language">
            <button
              type="button"
              onClick={() => setLang("en")}
              aria-pressed={lang === "en"}
              lang="en"
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => setLang("hi")}
              aria-pressed={lang === "hi"}
              lang="hi"
            >
              हिं
            </button>
            <button
              type="button"
              onClick={() => setLang("mr")}
              aria-pressed={lang === "mr"}
              lang="mr"
            >
              मरा
            </button>
          </div>

          {/* Dark / Light Toggle */}
          <button
            type="button"
            className="btn o"
            onClick={() => setIsDark(!isDark)}
            aria-label="Toggle Theme"
            style={{
              minWidth: "38px",
              minHeight: "38px",
              padding: 0,
              borderRadius: "10px",
              fontSize: "1rem"
            }}
          >
            {isDark ? "☀️" : "🌙"}
          </button>
        </div>
      </div>
    </header>
  );
}
