"use client";

import { useState, useEffect } from "react";
import TerminalBoot from "./TerminalBoot";
import { Terminal, Activity, Zap, CheckCircle2, ArrowUpRight, Cpu, Layers } from "lucide-react";

interface HeroProps {
  onOpenCommandPalette?: () => void;
}

export default function Hero({ onOpenCommandPalette }: HeroProps) {
  const [activeTab, setActiveTab] = useState<"terminal" | "telemetry" | "metrics">("terminal");
  const [sargodhaTime, setSargodhaTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Format to Sargodha, Pakistan (Asia/Karachi UTC+5)
      const formatted = new Intl.DateTimeFormat("en-US", {
        timeZone: "Asia/Karachi",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      }).format(now);
      setSargodhaTime(formatted);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main
      id="top"
      className="hero relative z-10 flex items-center justify-center min-h-0 flex-1"
      style={{
        padding: "16px 24px var(--hero-gap)",
      }}
    >
      <div
        className="hero-copy relative z-1 flex flex-col items-center text-center w-full"
        style={{ maxWidth: "var(--copy-max)" }}
      >
        {/* Availability & Live Location Time Pill */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
          <div
            className="appear appear--pop inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 dark:bg-emerald-950/20 backdrop-blur-md text-xs font-mono text-emerald-600 dark:text-emerald-300 shadow-sm"
            style={{ "--d": "0.15s" } as React.CSSProperties}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="font-medium">Available for High-Impact Projects</span>
          </div>

          <div
            className="appear appear--soft hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-zinc-200 dark:border-white/10 bg-white/70 dark:bg-white/[0.03] backdrop-blur-md text-xs font-mono text-zinc-600 dark:text-zinc-400 shadow-sm"
            style={{ "--d": "0.22s" } as React.CSSProperties}
          >
            <span className="text-zinc-400 dark:text-zinc-500">Sargodha, PK:</span>
            <span className="text-zinc-900 dark:text-white font-medium">{sargodhaTime || "UTC+5"}</span>
            <span className="text-zinc-400 dark:text-zinc-500">(PKT)</span>
          </div>
        </div>

        {/* Main Headline */}
        <h1
          className="flex flex-col items-center text-center font-medium tracking-tight"
          style={{
            fontSize: "var(--h1)",
            lineHeight: 1.1,
            letterSpacing: "-0.04em",
          }}
        >
          <span className="headline-line">
            <span
              className="block appear appear--mask bg-gradient-to-b from-slate-900 via-slate-800 to-slate-600 dark:from-white dark:via-white dark:to-zinc-400 bg-clip-text text-transparent"
              style={{ "--d": "0.32s" } as React.CSSProperties}
            >
              Architecting <em>intelligent systems</em> &amp;
            </span>
          </span>
          <span className="headline-line">
            <span
              className="block appear appear--mask bg-gradient-to-b from-slate-900 via-slate-700 to-slate-500 dark:from-white dark:via-zinc-200 dark:to-zinc-500 bg-clip-text text-transparent"
              style={{ "--d": "0.45s" } as React.CSSProperties}
            >
              high-throughput platforms.
            </span>
          </span>
        </h1>

        {/* Lede Summary */}
        <p
          className="lede appear appear--soft text-zinc-600 dark:text-zinc-400 font-normal leading-relaxed"
          style={{
            maxWidth: "var(--lede-max)",
            fontSize: "var(--lede)",
            marginTop: "18px",
            "--d": "0.6s",
          } as React.CSSProperties}
        >
          Senior full-stack &amp; AI systems architect with 7+ years crafting mission-critical desktop POS software, Amadeus GDS flight engines, custom WordPress &amp; WooCommerce architectures, and resilient Next.js web systems.
        </p>

        {/* Hero Actions */}
        <div className="hero-actions flex flex-wrap items-center justify-center gap-3.5 mt-7 w-full max-w-sm sm:max-w-none">
          <a
            href="#projects"
            className="btn btn-solid appear appear--btn w-full sm:w-auto"
            style={{
              height: "var(--hero-btn-h)",
              padding: "0 24px",
              "--d": "0.75s",
            } as React.CSSProperties}
          >
            <span>Explore Production Work</span>
            <ArrowUpRight className="w-4 h-4 ml-1.5" />
          </a>
          <a
            href="#architecture"
            className="btn btn-ghost hero-ghost appear appear--side w-full sm:w-auto"
            style={{
              height: "var(--hero-btn-h)",
              padding: "0 22px",
              "--d": "0.85s",
            } as React.CSSProperties}
          >
            <Layers className="w-4 h-4 mr-2 text-zinc-400" />
            <span>Architecture Telemetry</span>
          </a>
          <button
            type="button"
            onClick={onOpenCommandPalette}
            className="btn btn-ghost hero-ghost appear appear--side hidden md:inline-flex items-center gap-2"
            style={{
              height: "var(--hero-btn-h)",
              padding: "0 18px",
              "--d": "0.95s",
            } as React.CSSProperties}
            title="Press Ctrl+K"
          >
            <span className="font-mono text-xs text-zinc-600 dark:text-zinc-400">⌘K Quick Menu</span>
          </button>
        </div>

        {/* Interactive Live Engineering Console Hub */}
        <div
          className="appear appear--soft w-full max-w-2xl mt-8 transition-all duration-300"
          style={{ "--d": "1.05s" } as React.CSSProperties}
        >
          <div className="rounded-2xl border border-zinc-200/90 dark:border-white/15 bg-white/90 dark:bg-[#09090b]/90 backdrop-blur-2xl text-left shadow-[0_20px_40px_rgba(0,0,0,0.06)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(255,255,255,0.05)] relative overflow-hidden group">
            {/* Top Shine Accent */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-zinc-300 dark:via-white/40 to-transparent" />

            {/* Window Top Bar & Interactive Tabs */}
            <div className="flex flex-wrap items-center justify-between border-b border-zinc-200 dark:border-white/10 px-4 py-2.5 bg-zinc-50/70 dark:bg-white/[0.02]">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]/80 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]/80 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]/80 inline-block" />
                <span className="font-mono text-[11px] text-zinc-500 dark:text-zinc-400 ml-2 tracking-wider hidden sm:inline">
                  workstation@mohammad-asim: ~
                </span>
              </div>

              {/* Console Tabs */}
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setActiveTab("terminal")}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono transition-all cursor-pointer ${
                    activeTab === "terminal"
                      ? "bg-zinc-900 text-white dark:bg-white/15 dark:text-white font-medium shadow-xs"
                      : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-200/60 dark:text-zinc-400 dark:hover:text-zinc-200 dark:hover:bg-white/5"
                  }`}
                >
                  <Terminal className="w-3 h-3" />
                  <span>Terminal</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab("telemetry")}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono transition-all cursor-pointer ${
                    activeTab === "telemetry"
                      ? "bg-zinc-900 text-white dark:bg-white/15 dark:text-white font-medium shadow-xs"
                      : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-200/60 dark:text-zinc-400 dark:hover:text-zinc-200 dark:hover:bg-white/5"
                  }`}
                >
                  <Cpu className="w-3 h-3" />
                  <span>Pipelines</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab("metrics")}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono transition-all cursor-pointer ${
                    activeTab === "metrics"
                      ? "bg-zinc-900 text-white dark:bg-white/15 dark:text-white font-medium shadow-xs"
                      : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-200/60 dark:text-zinc-400 dark:hover:text-zinc-200 dark:hover:bg-white/5"
                  }`}
                >
                  <Activity className="w-3 h-3" />
                  <span>Telemetry</span>
                </button>
              </div>
            </div>

            {/* Tab Body */}
            <div className="p-4 sm:p-5">
              {activeTab === "terminal" && <TerminalBoot />}

              {activeTab === "telemetry" && (
                <div className="font-mono text-xs space-y-3">
                  <div className="text-zinc-500 dark:text-zinc-400 flex items-center justify-between pb-2 border-b border-zinc-200 dark:border-white/10">
                    <span className="text-zinc-800 dark:text-zinc-200 font-semibold flex items-center gap-2">
                      <Zap className="w-3.5 h-3.5 text-amber-500 dark:text-amber" />
                      Active Production Architecture Nodes
                    </span>
                    <span className="text-[10px] text-emerald-700 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-950/50 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-500/30 font-medium">
                      HEALTHY (200 OK)
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                    <div className="p-2.5 rounded-lg bg-zinc-50/80 dark:bg-white/[0.03] border border-zinc-200 dark:border-white/10">
                      <div className="text-[11px] text-zinc-800 dark:text-zinc-300 font-medium flex items-center justify-between">
                        <span>Amadeus GDS Gateway</span>
                        <span className="text-emerald-600 dark:text-phosphor text-[10px] font-semibold">~38ms</span>
                      </div>
                      <p className="text-[10px] text-zinc-500 mt-1">
                        Direct SOAP/REST flight lookup &amp; multi-currency pricing
                      </p>
                    </div>

                    <div className="p-2.5 rounded-lg bg-zinc-50/80 dark:bg-white/[0.03] border border-zinc-200 dark:border-white/10">
                      <div className="text-[11px] text-zinc-800 dark:text-zinc-300 font-medium flex items-center justify-between">
                        <span>Electron POS Runtime</span>
                        <span className="text-emerald-600 dark:text-emerald-400 text-[10px] font-semibold">Zero Latency</span>
                      </div>
                      <p className="text-[10px] text-zinc-500 mt-1">
                        Local SQLite caching + ESC/POS USB thermal driver
                      </p>
                    </div>

                    <div className="p-2.5 rounded-lg bg-zinc-50/80 dark:bg-white/[0.03] border border-zinc-200 dark:border-white/10">
                      <div className="text-[11px] text-zinc-800 dark:text-zinc-300 font-medium flex items-center justify-between">
                        <span>Autonomous AI Pipelines</span>
                        <span className="text-cyan-600 dark:text-cyan-400 text-[10px] font-semibold">Agentic</span>
                      </div>
                      <p className="text-[10px] text-zinc-500 mt-1">
                        Function calling, tool use &amp; automated ledger sync
                      </p>
                    </div>

                    <div className="p-2.5 rounded-lg bg-zinc-50/80 dark:bg-white/[0.03] border border-zinc-200 dark:border-white/10">
                      <div className="text-[11px] text-zinc-800 dark:text-zinc-300 font-medium flex items-center justify-between">
                        <span>Next.js 14 App Router</span>
                        <span className="text-zinc-900 dark:text-white text-[10px] font-semibold">Edge Cache</span>
                      </div>
                      <p className="text-[10px] text-zinc-500 mt-1">
                        Server actions, streaming SSR &amp; 100/100 Core Web Vitals
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "metrics" && (
                <div className="font-mono text-xs space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-zinc-200 dark:border-white/10 text-zinc-500 dark:text-zinc-400">
                    <span>Telemetry Monitor &bull; 7+ Years Aggregate</span>
                    <span className="text-[10px] text-zinc-400 dark:text-zinc-500">Live Diagnostics</span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-center pt-1">
                    <div className="p-3 rounded-lg bg-zinc-50/80 dark:bg-white/[0.03] border border-zinc-200 dark:border-white/10">
                      <div className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-white tracking-tight">
                        99.9%
                      </div>
                      <div className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-1">POS &amp; Web Uptime</div>
                    </div>
                    <div className="p-3 rounded-lg bg-zinc-50/80 dark:bg-white/[0.03] border border-zinc-200 dark:border-white/10">
                      <div className="text-lg sm:text-xl font-bold text-emerald-600 dark:text-phosphor tracking-tight">
                        &lt;50ms
                      </div>
                      <div className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-1">Transaction Latency</div>
                    </div>
                    <div className="p-3 rounded-lg bg-zinc-50/80 dark:bg-white/[0.03] border border-zinc-200 dark:border-white/10">
                      <div className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-white tracking-tight">
                        100/100
                      </div>
                      <div className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-1">Performance Vitals</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-[11px] text-zinc-600 dark:text-zinc-400 pt-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400 shrink-0" />
                    <span>Hardware interfaces validated: ESC/POS Thermal, Barcode Serial, SQLite WAL</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
