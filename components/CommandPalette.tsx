"use client";

import { useEffect, useState, useMemo } from "react";
import { useTheme } from "./ThemeProvider";
import {
  Search,
  Terminal,
  ExternalLink,
  Copy,
  Check,
  Phone,
  MessageSquare,
  Sparkles,
  Layers,
  Briefcase,
  Compass,
  X,
  Sun,
  Moon,
  Zap,
} from "lucide-react";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenTerminal?: () => void;
}

export default function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const [copied, setCopied] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (isOpen) {
          onClose();
        }
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const copyEmail = () => {
    navigator.clipboard.writeText("aasimameer06@gmail.com");
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
      onClose();
    }, 1500);
  };

  const commands = useMemo(
    () => [
      {
        category: "Preferences",
        items: [
          {
            id: "act-theme",
            title: theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode",
            subtitle: theme === "dark" ? "Clean luxury off-white palette" : "Sleek liquid metal dark mode",
            icon: theme === "dark" ? Sun : Moon,
            action: () => {
              toggleTheme();
              onClose();
            },
          },
        ],
      },
      {
        category: "Navigation",
        items: [
          {
            id: "nav-playgrounds",
            title: "Interactive Engineering Labs",
            subtitle: "Simulate OmniPOS thermal printer, Amadeus GDS & AI Agent dispatch",
            icon: Zap,
            action: () => {
              window.location.hash = "playgrounds";
              onClose();
            },
          },
          {
            id: "nav-projects",
            title: "Selected Production Systems",
            subtitle: "Browse featured web & desktop POS projects",
            icon: Briefcase,
            action: () => {
              window.location.hash = "projects";
              onClose();
            },
          },
          {
            id: "nav-architecture",
            title: "Architecture Visualizer",
            subtitle: "Interactive telemetry: Amadeus GDS & Offline POS",
            icon: Layers,
            action: () => {
              window.location.hash = "architecture";
              onClose();
            },
          },
          {
            id: "nav-skills",
            title: "Technical Capabilities & Stack",
            subtitle: "React, Next.js, Electron, SQLite, AI Agents",
            icon: Compass,
            action: () => {
              window.location.hash = "skills";
              onClose();
            },
          },
          {
            id: "nav-experience",
            title: "Engineering Track Record",
            subtitle: "7+ years production timeline & milestones",
            icon: Sparkles,
            action: () => {
              window.location.hash = "experience";
              onClose();
            },
          },
          {
            id: "nav-contact",
            title: "Direct Engineering Contact",
            subtitle: "Get in touch for architecture or contract work",
            icon: MessageSquare,
            action: () => {
              window.location.hash = "contact";
              onClose();
            },
          },
        ],
      },
      {
        category: "Production Projects",
        items: [
          {
            id: "proj-amd",
            title: "AMD Global",
            subtitle: "Aviation & Amadeus GDS Live Travel Platform",
            icon: ExternalLink,
            action: () => {
              window.open("https://amdglobal.de/", "_blank");
              onClose();
            },
          },
          {
            id: "proj-omnipos",
            title: "OmniPOS Desktop Runtime",
            subtitle: "Zero-latency retail counter POS with SQLite & ESC/POS",
            icon: Terminal,
            action: () => {
              window.open("https://omnipos-two.vercel.app/", "_blank");
              onClose();
            },
          },
          {
            id: "proj-rehmat",
            title: "Rehmat Lawn Mowers Store",
            subtitle: "Custom WordPress & WooCommerce equipment commerce platform",
            icon: ExternalLink,
            action: () => {
              window.open("https://rehmatlawnmowers.com/", "_blank");
              onClose();
            },
          },
          {
            id: "proj-dr-zrinka",
            title: "Dr. Zrinka Medical Practice",
            subtitle: "Clinical web platform & patient consultation flow",
            icon: ExternalLink,
            action: () => {
              window.open("http://dr-zrinka.com/", "_blank");
              onClose();
            },
          },
          {
            id: "proj-texan",
            title: "Texan Hills Corporate",
            subtitle: "100/100 Core Web Vitals vanilla architecture",
            icon: ExternalLink,
            action: () => {
              window.open("http://texanhillsinc.com/", "_blank");
              onClose();
            },
          },
        ],
      },
      {
        category: "Quick Connect",
        items: [
          {
            id: "act-email",
            title: copied ? "Copied to Clipboard!" : "Copy Direct Email",
            subtitle: "aasimameer06@gmail.com",
            icon: copied ? Check : Copy,
            action: copyEmail,
          },
          {
            id: "act-whatsapp",
            title: "Open WhatsApp Chat",
            subtitle: "+92 306 0112606 (Instant discussion)",
            icon: MessageSquare,
            action: () => {
              window.open("https://wa.me/923060112606", "_blank");
              onClose();
            },
          },
          {
            id: "act-call",
            title: "Call Direct Phone",
            subtitle: "+92 306 0112606",
            icon: Phone,
            action: () => {
              window.location.href = "tel:+923060112606";
              onClose();
            },
          },
        ],
      },
    ],
    [copied, theme, toggleTheme, onClose]
  );

  const filteredCategories = useMemo(() => {
    if (!query.trim()) return commands;
    const lowerQuery = query.toLowerCase();

    return commands
      .map((cat) => ({
        ...cat,
        items: cat.items.filter(
          (item) =>
            item.title.toLowerCase().includes(lowerQuery) ||
            item.subtitle.toLowerCase().includes(lowerQuery)
        ),
      }))
      .filter((cat) => cat.items.length > 0);
  }, [commands, query]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 sm:pt-28 px-4 bg-black/60 dark:bg-black/75 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl rounded-2xl border border-zinc-200 dark:border-white/15 bg-white/95 dark:bg-[#0e0e11]/95 text-zinc-900 dark:text-white shadow-[0_20px_50px_rgba(0,0,0,0.15),0_0_30px_rgba(0,0,0,0.06)] dark:shadow-[0_0_50px_rgba(0,0,0,0.8),0_0_30px_rgba(255,255,255,0.06)] overflow-hidden backdrop-blur-2xl transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Search Input */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-zinc-200 dark:border-white/10">
          <Search className="w-5 h-5 text-zinc-400 shrink-0" />
          <input
            type="text"
            autoFocus
            placeholder="Search commands, projects, theme, or press ESC..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-sm text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none font-sans"
          />
          <button
            onClick={onClose}
            className="p-1 rounded-md text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-[380px] overflow-y-auto p-2 space-y-4">
          {filteredCategories.length === 0 ? (
            <div className="py-12 text-center text-zinc-400 dark:text-zinc-500 text-sm">
              No matching commands or projects found for &quot;{query}&quot;.
            </div>
          ) : (
            filteredCategories.map((cat) => (
              <div key={cat.category} className="space-y-1">
                <div className="px-3 py-1 text-[11px] font-mono font-medium text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
                  {cat.category}
                </div>
                {cat.items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={item.action}
                      className="w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl text-left hover:bg-zinc-100 dark:hover:bg-white/10 transition-colors group cursor-pointer"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="p-2 rounded-lg bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white group-hover:border-zinc-300 dark:group-hover:border-white/20 transition-colors">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="truncate">
                          <div className="text-sm font-medium text-zinc-900 dark:text-white">
                            {item.title}
                          </div>
                          <div className="text-xs text-zinc-500 dark:text-zinc-400 truncate">
                            {item.subtitle}
                          </div>
                        </div>
                      </div>
                      <span className="text-[11px] font-mono text-zinc-400 dark:text-zinc-500 group-hover:text-zinc-700 dark:group-hover:text-zinc-300 shrink-0">
                        &rarr;
                      </span>
                    </button>
                  );
                })}
              </div>
            ))
          )}
        </div>

        {/* Footer info bar */}
        <div className="px-4 py-2.5 bg-zinc-50 dark:bg-black/40 border-t border-zinc-200 dark:border-white/5 flex items-center justify-between text-[11px] font-mono text-zinc-500">
          <span>Mohammad Asim &bull; Systems &amp; Web Architect</span>
          <div className="flex items-center gap-2">
            <kbd className="px-1.5 py-0.5 rounded bg-zinc-200 dark:bg-white/10 text-zinc-700 dark:text-zinc-300 text-[10px]">ESC</kbd>
            <span>to close</span>
          </div>
        </div>
      </div>
    </div>
  );
}
