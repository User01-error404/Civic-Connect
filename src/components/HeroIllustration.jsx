import React from "react";

export default function HeroIllustration() {
  return (
    <div className="hero-art-wrapper" aria-hidden="true">
      <svg
        viewBox="0 0 520 280"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="hero-art-svg"
      >
        <defs>
          <linearGradient id="skyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1E2026" />
            <stop offset="100%" stopColor="#111215" />
          </linearGradient>

          <linearGradient id="roadGrad" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#2A2C33" />
            <stop offset="100%" stopColor="#17181C" />
          </linearGradient>

          <linearGradient id="potholeDepth" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0B0C0E" />
            <stop offset="70%" stopColor="#17181C" />
            <stop offset="100%" stopColor="#22252C" />
          </linearGradient>

          <linearGradient id="waterSheen" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#1D4ED8" stopOpacity="0.15" />
          </linearGradient>

          <linearGradient id="coneGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#F97316" />
            <stop offset="50%" stopColor="#FB923C" />
            <stop offset="100%" stopColor="#EA580C" />
          </linearGradient>

          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Backdrop Card */}
        <rect width="520" height="280" rx="20" fill="url(#skyGrad)" />

        {/* Distant City Skyline / MBMC Silhouettes */}
        <path
          d="M20 140 H60 V120 H90 V140 H140 V95 H180 V140 H230 V110 H270 V140 H330 V105 H370 V140 H420 V125 H460 V140 H500 V140"
          stroke="#343842"
          strokeWidth="1.5"
          fill="none"
          strokeDasharray="4 4"
        />

        {/* Horizon Highway Perspective */}
        <polygon points="120,135 400,135 500,270 20,270" fill="url(#roadGrad)" />

        {/* Curb Edges */}
        <line x1="120" y1="135" x2="20" y2="270" stroke="#FFC400" strokeWidth="3" opacity="0.8" />
        <line x1="400" y1="135" x2="500" y2="270" stroke="#FFC400" strokeWidth="3" opacity="0.8" />

        {/* Yellow Dashed Lane Divider (Perspective) */}
        <polygon points="258,135 262,135 263,155 257,155" fill="#FFC400" />
        <polygon points="257,165 263,165 265,195 255,195" fill="#FFC400" />
        <polygon points="255,208 265,208 268,248 252,248" fill="#FFC400" />
        <polygon points="251,260 269,260 272,275 248,275" fill="#FFC400" />

        {/* Pothole 1 (Foreground Left) */}
        <g transform="translate(110, 205)">
          {/* Crack lines radiating */}
          <path
            d="M-22,-4 L-45,-12 M-15,-18 L-30,-32 M25,-16 L45,-28 M35,-2 L55,4 M15,18 L32,32 M-12,22 L-28,34"
            stroke="#111215"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d="M-22,-4 L-45,-12 M-15,-18 L-30,-32 M25,-16 L45,-28 M35,-2 L55,4 M15,18 L32,32 M-12,22 L-28,34"
            stroke="#4A4E58"
            strokeWidth="1.2"
            strokeLinecap="round"
          />

          {/* Deep Crater */}
          <ellipse cx="0" cy="0" rx="38" ry="19" fill="url(#potholeDepth)" />
          {/* Water Puddle inside */}
          <ellipse cx="2" cy="3" rx="26" ry="11" fill="url(#waterSheen)" />
          {/* Rough edge highlight */}
          <path
            d="M-36,-4 Q-20,-16 4,-14 Q28,-14 36,-2"
            stroke="#555A66"
            strokeWidth="2.5"
            fill="none"
          />
        </g>

        {/* Pothole 2 (Midground Right) */}
        <g transform="translate(350, 165)">
          <path
            d="M-14,-2 L-26,-8 M16,-6 L30,-12 M18,8 L28,16"
            stroke="#4A4E58"
            strokeWidth="1"
            strokeLinecap="round"
          />
          <ellipse cx="0" cy="0" rx="22" ry="10" fill="url(#potholeDepth)" />
          <ellipse cx="1" cy="2" rx="14" ry="5" fill="url(#waterSheen)" />
        </g>

        {/* Safety Traffic Cone (Left of main pothole) */}
        <g transform="translate(70, 185)">
          {/* Base */}
          <ellipse cx="12" cy="38" rx="18" ry="6" fill="#111215" opacity="0.6" />
          <polygon points="0,36 24,36 20,40 4,40" fill="#EA580C" />
          {/* Cone body */}
          <polygon points="12,4 2,36 22,36" fill="url(#coneGrad)" />
          {/* Reflective Bands */}
          <polygon points="10,14 14,14 16,21 8,21" fill="#FFFFFF" opacity="0.95" />
          <polygon points="7,25 17,25 19,31 5,31" fill="#FFFFFF" opacity="0.95" />
          {/* Glow / Highlight */}
          <circle cx="12" cy="4" r="2" fill="#FFEDD5" />
        </g>

        {/* Barricade / Inspection Sensor (Right Foreground) */}
        <g transform="translate(390, 190)">
          {/* Leg supports */}
          <line x1="8" y1="20" x2="0" y2="52" stroke="#475569" strokeWidth="3" />
          <line x1="56" y1="20" x2="64" y2="52" stroke="#475569" strokeWidth="3" />
          <line x1="4" y1="36" x2="60" y2="36" stroke="#334155" strokeWidth="2" />

          {/* Chevrons Board */}
          <rect x="0" y="8" width="64" height="18" rx="2" fill="#FFC400" />
          {/* Caution Stripes */}
          <polygon points="6,8 14,8 4,26 -4,26" fill="#17181C" />
          <polygon points="22,8 30,8 20,26 12,26" fill="#17181C" />
          <polygon points="38,8 46,8 36,26 28,26" fill="#17181C" />
          <polygon points="54,8 62,8 52,26 44,26" fill="#17181C" />

          {/* Flashing Amber Warning Lamp */}
          <circle cx="32" cy="4" r="4" fill="#F59E0B" filter="url(#glow)" />
          <circle cx="32" cy="4" r="2.5" fill="#FEF08A" />
        </g>

        {/* GPS Geo-Pin floating over pothole */}
        <g transform="translate(110, 142)">
          {/* Shadow */}
          <ellipse cx="0" cy="38" rx="8" ry="3" fill="#000000" opacity="0.5" />
          {/* Pin */}
          <path
            d="M0,0 C-12,0 -20,8 -20,18 C-20,29 0,38 0,38 C0,38 20,29 20,18 C20,8 12,0 0,0 Z"
            fill="#FFC400"
            stroke="#17181C"
            strokeWidth="2"
          />
          <circle cx="0" cy="16" r="6" fill="#17181C" />
          <circle cx="0" cy="16" r="2.5" fill="#FFC400" />
        </g>

        {/* Road Roller Silhouette in Distance */}
        <g transform="translate(290, 110)" opacity="0.55">
          {/* Roller drum */}
          <circle cx="16" cy="22" r="10" fill="#64748B" />
          {/* Cabin & Body */}
          <rect x="22" y="10" width="22" height="12" rx="2" fill="#475569" />
          <rect x="30" y="4" width="12" height="8" rx="1" fill="#94A3B8" />
          {/* Back wheels */}
          <circle cx="40" cy="22" r="8" fill="#334155" />
        </g>

        {/* Modern Live Radar Scan Effect */}
        <circle
          cx="110"
          cy="180"
          r="48"
          stroke="#FFC400"
          strokeWidth="1"
          strokeDasharray="4 4"
          opacity="0.35"
        />
        <circle
          cx="110"
          cy="180"
          r="72"
          stroke="#FFC400"
          strokeWidth="0.8"
          strokeDasharray="6 6"
          opacity="0.18"
        />
      </svg>
    </div>
  );
}
