import React from "react";

export default function BottomNav({ activeView, setActiveView, t }) {
  const items = [
    { key: "home", label: t("home"), icon: "🏠" },
    { key: "track", label: t("track"), icon: "📍" },
    { key: "report", label: t("report"), icon: "➕", isCta: true },
    { key: "campaigns", label: t("campaigns"), icon: "📢" },
    { key: "staff", label: "Staff", icon: "🏛️" }
  ];

  return (
    <nav className="bn" aria-label="Mobile Navigation">
      {items.map((item) => {
        const isCurrent = activeView === item.key;
        if (item.isCta) {
          return (
            <a
              key={item.key}
              href={`#${item.key}`}
              onClick={(e) => {
                e.preventDefault();
                setActiveView(item.key);
              }}
              className="cta"
              aria-current={isCurrent ? "page" : undefined}
            >
              <div
                style={{
                  background: "var(--y)",
                  color: "#17181C",
                  width: "48px",
                  height: "48px",
                  borderRadius: "50%",
                  marginTop: "-24px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.5rem",
                  fontWeight: 800,
                  boxShadow: "0 4px 10px rgba(0,0,0,0.25)",
                  border: "3px solid var(--sf)"
                }}
              >
                +
              </div>
              <span style={{ fontSize: "0.72rem", fontWeight: 700, marginTop: "2px" }}>
                {item.label}
              </span>
            </a>
          );
        }

        return (
          <a
            key={item.key}
            href={`#${item.key}`}
            onClick={(e) => {
              e.preventDefault();
              setActiveView(item.key);
            }}
            aria-current={isCurrent ? "page" : undefined}
          >
            <span style={{ fontSize: "1.2rem" }}>{item.icon}</span>
            <span>{item.label}</span>
          </a>
        );
      })}
    </nav>
  );
}
