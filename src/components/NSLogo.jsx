import React from 'react';

export default function NSLogo({ size = 36 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ filter: 'drop-shadow(0 0 8px rgba(16, 185, 129, 0.4))' }}
    >
      <defs>
        {/* Emerald Green Gradient */}
        <linearGradient id="nsEmerald" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00ff88" />
          <stop offset="100%" stopColor="#10b981" />
        </linearGradient>

        {/* Metallic Gold Gradient */}
        <linearGradient id="nsGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffe57f" />
          <stop offset="50%" stopColor="#ffd700" />
          <stop offset="100%" stopColor="#d4af37" />
        </linearGradient>

        {/* Outer Glow */}
        <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Rounded Hexagonal / Shield Base Container */}
      <rect
        x="6"
        y="6"
        width="88"
        height="88"
        rx="22"
        fill="#05080e"
        stroke="url(#nsGold)"
        strokeWidth="3.5"
      />

      {/* Interlocking 'N' Path in Gold */}
      <path
        d="M26 72 V28 L50 62 V28"
        stroke="url(#nsGold)"
        strokeWidth="8.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Interlocking 'S' Path in Neon Emerald */}
      <path
        d="M74 34 C74 29 68 26 60 26 C50 26 48 33 54 39 L68 47 C74 52 74 62 62 62 C52 62 46 57 46 51"
        stroke="url(#nsEmerald)"
        strokeWidth="8.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
