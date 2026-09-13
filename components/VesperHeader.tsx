"use client";

import { useEffect, useState } from "react";
import { useTheme } from "./ThemeProvider";
import { Sun, Moon } from "lucide-react";
import { playTabSwitchSound, playClickSound } from "@/lib/soundFX";

interface VesperHeaderProps {
  onOpenCommandPalette?: () => void;
}

export default function VesperHeader({ onOpenCommandPalette }: VesperHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    // Animation end listeners to add is-in
    const appears = document.querySelectorAll(".appear");
    appears.forEach((el) => {
      el.addEventListener(
        "animationend",
        () => {
          el.classList.add("is-in");
        },
        { once: true }
      );
    });

    // Fallback: if animations don't run or complete after 2 frames
    const fallbackTimer = setTimeout(() => {
      appears.forEach((el) => {
        el.classList.add("is-in");
      });
    }, 2200);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };

    const handleResize = () => {
      if (window.innerWidth >= 901) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(fallbackTimer);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add("menu-open");
    } else {
      document.body.classList.remove("menu-open");
    }
  }, [menuOpen]);

  const navItems = [
    { label: "Projects", href: "#projects", appear: "appear--scale", delay: "0.16s" },
    { label: "Labs", href: "#playgrounds", appear: "appear--scale", delay: "0.20s" },
    { label: "Architecture", href: "#architecture", appear: "appear--soft", delay: "0.24s" },
    { label: "Capabilities", href: "#skills", appear: "appear--scale", delay: "0.32s" },
    { label: "Experience", href: "#experience", appear: "appear--soft", delay: "0.40s" },
    { label: "Contact", href: "#contact", appear: "appear--soft", delay: "0.48s" },
  ];

  return (
    <>
      {/* Mobile Menu Backdrop */}
      <div
        className={`menu-backdrop fixed inset-0 z-40 transition-all duration-300 md:hidden ${
          menuOpen
            ? "opacity-100 pointer-events-auto bg-black/80 backdrop-blur-2xl"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMenuOpen(false)}
        aria-hidden="true"
      />

      <header
        className="header relative z-40 grid items-center"
        style={{
          gridTemplateColumns: "1fr auto 1fr",
          padding: "var(--header-y) var(--header-x) 10px",
        }}
      >
        {/* Left: Logo */}
        <a
          href="#top"
          className="logo appear appear--scale inline-flex items-center gap-[9px] justify-self-start font-semibold tracking-[-0.03em] text-zinc-900 dark:text-white group"
          style={{ fontSize: "var(--logo)", "--d": "0.08s" } as React.CSSProperties}
          aria-label="Mohammad Asim"
        >
          <div className="w-[26px] h-[26px] rounded-lg bg-zinc-900/10 dark:bg-white/10 border border-zinc-300 dark:border-white/20 flex items-center justify-center text-zinc-900 dark:text-white group-hover:bg-zinc-900 group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black transition-all">
            <svg
              width={18}
              height={18}
              style={{ width: 18, height: 18, minWidth: 18, maxWidth: 18 }}
              className="w-[18px] h-[18px] shrink-0"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <g transform="rotate(-30 12 12)">
                <circle cx="7.3" cy="3.2" r="1.45" />
                <rect x="5.5" y="4.7" width="3.6" height="14.6" rx="1.8" />
                <rect x="14.9" y="4.7" width="3.6" height="14.6" rx="1.8" />
                <circle cx="16.7" cy="20.8" r="1.45" />
              </g>
            </svg>
          </div>
          <span className="font-semibold text-zinc-900 dark:text-white tracking-tight">
            Mohammad Asim<span className="text-zinc-500 dark:text-[#8e8e93] font-normal">.dev</span>
          </span>
        </a>

        {/* Center: Desktop Nav Pills */}
        <nav
          id="site-nav"
          aria-label="Primary"
          className="hidden min-[901px]:flex items-center gap-1.5 p-1 rounded-full border border-white/10 bg-black/40 backdrop-blur-xl shadow-lg justify-self-center"
        >
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => playClickSound()}
              className={`nav-pill appear ${item.appear}`}
              style={{ "--d": item.delay } as React.CSSProperties}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Mobile Fullscreen Nav Overlay */}
        <div
          className={`min-[901px]:hidden fixed inset-0 z-45 flex flex-col items-center justify-center gap-3 px-6 transition-all duration-300 ${
            menuOpen
              ? "opacity-100 pointer-events-auto translate-y-0"
              : "opacity-0 pointer-events-none -translate-y-4"
          }`}
          style={{
            paddingTop: "max(96px, calc(env(safe-area-inset-top) + 88px))",
            paddingBottom: "32px",
          }}
        >
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="nav-pill w-full max-w-xs justify-center text-center text-base h-13 rounded-2xl border border-white/15 bg-white/5 backdrop-blur-xl"
            >
              {item.label}
            </a>
          ))}
          <button
            type="button"
            onClick={() => {
              setMenuOpen(false);
              onOpenCommandPalette?.();
            }}
            className="w-full max-w-xs flex items-center justify-center gap-2 h-13 rounded-2xl border border-zinc-300 dark:border-white/15 bg-white/10 text-current text-base"
          >
            <span>Search &amp; Commands</span>
            <kbd className="px-2 py-0.5 rounded bg-zinc-200 dark:bg-white/20 text-xs font-mono">⌘K</kbd>
          </button>
          <button
            type="button"
            onClick={toggleTheme}
            className="w-full max-w-xs flex items-center justify-center gap-2 h-13 rounded-2xl border border-zinc-300 dark:border-white/15 bg-white/10 text-current text-base cursor-pointer"
          >
            {theme === "dark" ? (
              <>
                <Sun className="w-4 h-4 text-amber-400" />
                <span>Switch to Light Mode</span>
              </>
            ) : (
              <>
                <Moon className="w-4 h-4 text-zinc-700" />
                <span>Switch to Dark Mode</span>
              </>
            )}
          </button>
          <a
            href="#contact"
            onClick={() => setMenuOpen(false)}
            className="btn btn-solid w-full max-w-xs justify-center text-center text-base h-13 rounded-2xl mt-1 font-medium"
          >
            Schedule Discussion
          </a>
        </div>

        {/* Right: Search / Command Palette & CTA Button */}
        <div className="flex items-center gap-2 justify-self-end">
          {/* Theme Toggle Button */}
          <button
            type="button"
            onClick={() => {
              playTabSwitchSound();
              toggleTheme();
            }}
            className="appear appear--scale flex items-center justify-center w-8 h-8 rounded-full border border-zinc-300 dark:border-white/15 bg-white dark:bg-white/5 hover:bg-zinc-100 dark:hover:bg-white/10 text-zinc-700 dark:text-zinc-200 transition-all cursor-pointer shadow-sm"
            style={{ "--d": "0.22s" } as React.CSSProperties}
            aria-label="Toggle theme"
            title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {theme === "dark" ? (
              <Sun className="w-3.5 h-3.5 text-amber-400" />
            ) : (
              <Moon className="w-3.5 h-3.5 text-zinc-700" />
            )}
          </button>

          {/* Quick Command Trigger */}
          <button
            type="button"
            onClick={onOpenCommandPalette}
            className="appear appear--scale hidden md:inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-zinc-300 dark:border-white/15 bg-white/80 dark:bg-white/5 hover:bg-white hover:border-zinc-400 dark:hover:bg-white/10 dark:hover:border-white/30 text-xs text-zinc-700 dark:text-zinc-300 transition-all cursor-pointer shadow-sm"
            style={{ "--d": "0.28s" } as React.CSSProperties}
            title="Press Ctrl+K or Cmd+K"
          >
            <svg className="w-3.5 h-3.5 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span className="font-mono text-[11px] text-zinc-500 dark:text-zinc-400">Search</span>
            <kbd className="px-1.5 py-0.2 rounded bg-zinc-200 dark:bg-white/10 text-[10px] font-mono text-zinc-600 dark:text-zinc-300 border border-zinc-300 dark:border-white/10">
              ⌘K
            </kbd>
          </button>

          <a
            href="#contact"
            className="btn btn-solid header-cta appear appear--scale hidden sm:inline-flex"
            style={{ "--d": "0.34s" } as React.CSSProperties}
          >
            Start Project
          </a>

          {/* Burger Button (shown on mobile <= 900px) */}
          <button
            type="button"
            className="min-[901px]:hidden relative z-50 flex flex-col items-center justify-center w-[40px] h-[40px] rounded-full border border-white/20 bg-black/70 backdrop-blur-md transition-colors hover:border-white/40 cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-controls="site-nav"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            <span
              className={`block w-4 h-[1.5px] bg-white rounded-sm transition-transform duration-250 ${
                menuOpen ? "translate-y-[6.5px] rotate-45" : ""
              }`}
            />
            <span
              className={`block w-4 h-[1.5px] bg-white rounded-sm my-[3.5px] transition-opacity duration-200 ${
                menuOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`block w-4 h-[1.5px] bg-white rounded-sm transition-transform duration-250 ${
                menuOpen ? "-translate-y-[6.5px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </header>
    </>
  );
}
