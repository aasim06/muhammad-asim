export default function VesperStats() {
  return (
    <footer
      className="stats flex flex-col min-[901px]:flex-row items-center justify-between gap-4 min-[901px]:gap-6 text-zinc-700 dark:text-[#d8d8d8] relative z-10"
      style={{
        padding: "0 var(--stats-x) var(--stats-y)",
        paddingBottom: "max(var(--stats-y), env(safe-area-inset-bottom))",
      }}
    >
      {/* Stat 1: Dual-pill / workflow */}
      <div
        className="stat appear appear--stat inline-flex items-center gap-[14px] text-center min-[901px]:text-left"
        style={{
          fontSize: "var(--stat-size)",
          letterSpacing: "-0.015em",
          whiteSpace: "nowrap",
          "--d": "1.12s",
        } as React.CSSProperties}
      >
        <svg
          width={20}
          height={20}
          style={{ width: 20, height: 20, minWidth: 20, maxWidth: 20 }}
          className="w-5 h-5 shrink-0 text-zinc-700 dark:text-[#e8e8e8]"
          viewBox="0 0 24 24"
          fill="none"
        >
          <defs>
            <linearGradient id="pillGrad1" x1="3" y1="2" x2="14" y2="22" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.38" />
              <stop offset="100%" stopColor="#3a3a3a" stopOpacity="0.62" />
            </linearGradient>
            <linearGradient id="pillGrad2" x1="13" y1="2" x2="24" y2="22" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#3a3a3a" stopOpacity="0.38" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0.62" />
            </linearGradient>
          </defs>
          <rect x="3.4" y="2.6" width="7.2" height="18.8" rx="3.6" fill="url(#pillGrad1)" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />
          <rect x="13.4" y="2.6" width="7.2" height="18.8" rx="3.6" fill="url(#pillGrad2)" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />
          <rect x="9.2" y="10.9" width="5.6" height="2.2" rx="1.1" fill="#4a4a4a" />
        </svg>
        <span className="font-normal text-zinc-700 dark:text-[#d8d8d8]">7+ Years building production software</span>
      </div>

      {/* Stat 2: Download tile */}
      <div
        className="stat appear appear--stat inline-flex items-center gap-[14px] text-center min-[901px]:text-left"
        style={{
          fontSize: "var(--stat-size)",
          letterSpacing: "-0.015em",
          whiteSpace: "nowrap",
          "--d": "1.28s",
        } as React.CSSProperties}
      >
        <svg
          width={20}
          height={20}
          style={{ width: 20, height: 20, minWidth: 20, maxWidth: 20 }}
          className="w-5 h-5 shrink-0"
          viewBox="0 0 24 24"
          fill="none"
        >
          <rect x="2.4" y="2.4" width="19.2" height="19.2" rx="6.2" fill="currentColor" className="text-zinc-900 dark:text-white" />
          <path
            d="M12 7.1v7.4M8.15 12.35L12 16.2l3.85-3.85"
            stroke="currentColor"
            className="text-white dark:text-[#111111]"
            strokeWidth="1.85"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className="font-normal text-zinc-700 dark:text-[#d8d8d8]">99.9% reliability in POS &amp; web systems</span>
      </div>

      {/* Stat 3: Three avatars */}
      <div
        className="stat appear appear--stat inline-flex items-center gap-[14px] text-center min-[901px]:text-left"
        style={{
          fontSize: "var(--stat-size)",
          letterSpacing: "-0.015em",
          whiteSpace: "nowrap",
          "--d": "1.44s",
        } as React.CSSProperties}
      >
        <svg
          width={38}
          height={21}
          style={{ width: 38, height: 21, minWidth: 38, maxWidth: 38 }}
          className="w-[38px] h-[21px] shrink-0"
          viewBox="0 0 40 22"
          fill="none"
        >
          {/* Avatar 1: Dark avatar with ears & face */}
          <circle cx="10.2" cy="11" r="9.2" fill="#2b2b2b" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />
          <polygon points="6.5,4.5 8,7.5 5,7.5" fill="#2b2b2b" />
          <polygon points="13.9,4.5 15.4,7.5 12.4,7.5" fill="#2b2b2b" />
          <ellipse cx="10.2" cy="12.1" rx="4.15" ry="3.7" fill="#f4f4f4" />
          <circle cx="8.8" cy="11.8" r="0.7" fill="#1a1a1a" />
          <circle cx="11.6" cy="11.8" r="0.7" fill="#1a1a1a" />

          {/* Avatar 2: White avatar with smile */}
          <circle cx="20.2" cy="11" r="9.2" fill="#ffffff" stroke="rgba(0,0,0,0.1)" strokeWidth="0.5" />
          <circle cx="18.5" cy="9.8" r="1.7" fill="#111111" />
          <circle cx="21.9" cy="9.8" r="1.7" fill="#111111" />
          <ellipse cx="20.2" cy="12.2" rx="1.2" ry="0.8" fill="#e5e5e5" />
          <path d="M18.8 13.8c.8.8 2 .8 2.8 0" stroke="#111111" strokeWidth="1.2" strokeLinecap="round" />

          {/* Avatar 3: Orange avatar with 'e' */}
          <circle cx="30.2" cy="11" r="9.2" fill="#f26b1d" />
          <text
            x="30.2"
            y="15.1"
            fill="#ffffff"
            fontSize="12.5"
            fontWeight="700"
            fontFamily="Inter, sans-serif"
            textAnchor="middle"
          >
            e
          </text>
        </svg>
        <span className="font-normal text-[#d8d8d8]">180+ teams &amp; businesses powered</span>
      </div>
    </footer>
  );
}
