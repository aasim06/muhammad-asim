"use client";

import { useEffect, useState } from "react";

type CommandKey = "about" | "skills" | "architecture" | "contact";

export default function TerminalBoot() {
  const [mounted, setMounted] = useState(false);
  const [history, setHistory] = useState<Array<{ cmd: string; output: string[] }>>([
    {
      cmd: "whoami",
      output: [
        "Mohammad Asim — Senior Full-Stack & Desktop Systems Developer",
        "7+ years shipping mission-critical web platforms, POS desktop engines, and AI agents.",
      ],
    },
  ]);
  const [activeTab, setActiveTab] = useState<CommandKey>("about");

  const COMMAND_DATA: Record<CommandKey, { cmd: string; output: string[] }> = {
    about: {
      cmd: "cat profile.nfo",
      output: [
        "Location: Sargodha, Punjab, Pakistan",
        "Experience: 7+ Years (Web Applications, Electron Desktop, AI Automation)",
        "Focus: Zero-latency counter systems, high-availability web platforms, AI infrastructure.",
      ],
    },
    skills: {
      cmd: "ls -m stack/",
      output: [
        "Next.js 14, React 18, TypeScript, Tailwind CSS, Node.js, Electron JS,",
        "Tauri, SQLite, REST/GraphQL, Amadeus API, AI Agent Frameworks, WordPress.",
      ],
    },
    architecture: {
      cmd: "systemctl status engineering.service",
      output: [
        "● engineering.service - High-Reliability Software Architecture",
        "   Loaded: active (running) | Uptime: 7+ years across 20+ production systems",
        "   Specs: Offline-first sync, sub-second transaction processing, modern DX.",
      ],
    },
    contact: {
      cmd: "curl -s api/contact",
      output: [
        "Email: aasimameer06@gmail.com",
        "Phone: +92 306 0112606",
        "Availability: Available for contract and senior engineering engagements.",
      ],
    },
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  const runCommand = (key: CommandKey) => {
    setActiveTab(key);
    const item = COMMAND_DATA[key];
    setHistory((prev) => {
      // keep last 3 commands clean
      const updated = [...prev, { cmd: item.cmd, output: item.output }];
      return updated.slice(-3);
    });
  };

  if (!mounted) {
    return (
      <div className="font-mono text-xs text-zinc-400">
        <span className="text-phosphor">$ whoami</span>
        <p className="text-zinc-500 mt-1">Initializing environment...</p>
      </div>
    );
  }

  return (
    <div className="font-mono text-xs leading-relaxed select-text">
      {/* Quick Interactive Command Pills */}
      <div className="flex flex-wrap gap-1.5 mb-3 pb-2 border-b border-zinc-200 dark:border-white/10">
        <span className="text-[10px] text-zinc-500 uppercase tracking-wider self-center mr-1">
          Quick Run:
        </span>
        {(["about", "skills", "architecture", "contact"] as CommandKey[]).map((key) => (
          <button
            key={key}
            type="button"
            onClick={() => runCommand(key)}
            className={`px-2 py-0.5 rounded text-[11px] transition-all cursor-pointer ${
              activeTab === key
                ? "bg-zinc-900 text-white dark:bg-white dark:text-black font-semibold shadow-xs"
                : "bg-zinc-100 text-zinc-600 dark:bg-white/5 dark:text-zinc-400 hover:bg-zinc-200 hover:text-zinc-900 dark:hover:bg-white/10 dark:hover:text-white"
            }`}
          >
            ./{key}.sh
          </button>
        ))}
      </div>

      {/* Terminal History */}
      <div className="space-y-2.5 max-h-[160px] overflow-y-auto pr-1">
        {history.map((entry, idx) => (
          <div key={idx} className="space-y-1">
            <div className="flex items-center gap-1.5 text-zinc-700 dark:text-zinc-300">
              <span className="text-emerald-600 dark:text-phosphor font-semibold">$</span>
              <span className="text-zinc-900 dark:text-white font-medium">{entry.cmd}</span>
            </div>
            {entry.output.map((line, lIdx) => (
              <p
                key={lIdx}
                className={`text-[11px] pl-3 border-l ${
                  line.startsWith("●")
                    ? "text-emerald-700 dark:text-emerald-400 border-emerald-500/40"
                    : "text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-white/10"
                }`}
              >
                {line}
              </p>
            ))}
          </div>
        ))}
      </div>

      <div className="flex items-center gap-1.5 text-zinc-700 dark:text-zinc-300 mt-2">
        <span className="text-emerald-600 dark:text-phosphor font-semibold">$</span>
        <span className="text-zinc-400 dark:text-zinc-500 text-[11px]">ready</span>
        <span className="crt-caret">&nbsp;</span>
      </div>
    </div>
  );
}
