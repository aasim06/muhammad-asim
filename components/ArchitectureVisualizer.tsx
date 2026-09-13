"use client";

import { useState } from "react";
import {
  Layers,
  Server,
  Database,
  Printer,
  Plane,
  ShieldCheck,
  Zap,
  ArrowRight,
  CheckCircle,
  RefreshCw,
  Terminal,
  Volume2,
  VolumeX,
} from "lucide-react";
import {
  playNodeSelectSound,
  playTabSwitchSound,
  playClickSound,
  isAudioMuted,
  toggleAudioMuted,
} from "@/lib/soundFX";

type ArchitectureType = "gds" | "pos";

interface ArchitectureStep {
  title: string;
  role: string;
  protocol: string;
  latency: string;
  description: string;
  failover: string;
  icon: any;
}

const GDS_PIPELINE: ArchitectureStep[] = [
  {
    title: "Next.js 14 Client",
    role: "Edge Frontend & Search Matrix",
    protocol: "HTTPS / HTTP3",
    latency: "< 25ms",
    description: "Responsive multi-city flight matrix with instant client-side date debounce and real-time form validation.",
    failover: "Client-side SWR caching & stale-while-revalidate fallback",
    icon: Layers,
  },
  {
    title: "Edge API Gateway",
    role: "Auth, Rate Limiting & Proxy",
    protocol: "Node.js REST",
    latency: "< 15ms",
    description: "Validates session tokens, handles currency normalization, and manages cached GDS bearer tokens.",
    failover: "Automated token renewal with Redis token cluster replication",
    icon: Server,
  },
  {
    title: "Amadeus GDS Core",
    role: "Global Flight Inventory",
    protocol: "SOAP / REST XML",
    latency: "~180ms",
    description: "Direct query to Amadeus Global Distribution System for live airline inventory, fare rules, and seat maps.",
    failover: "Retry backoff algorithm with secondary endpoint routing",
    icon: Plane,
  },
  {
    title: "Pricing & Markup Engine",
    role: "Custom Business Rules",
    protocol: "Microservice Logic",
    latency: "< 8ms",
    description: "Calculates commission margins, seasonal package markups, and currency conversion on the fly.",
    failover: "Deterministic static price matrix rules if service times out",
    icon: Zap,
  },
  {
    title: "Automated Ticket Dispatch",
    role: "PNR Generation & Receipt",
    protocol: "Async Worker Queue",
    latency: "Instant PNR",
    description: "Issues booking reference, locks seat with airline, and sends digital itinerary via email & SMS.",
    failover: "Persistent BullMQ queue with transactional worker retries",
    icon: ShieldCheck,
  },
];

const POS_PIPELINE: ArchitectureStep[] = [
  {
    title: "Electron Touch Runtime",
    role: "Cashier Counter Interface",
    protocol: "React + Electron IPC",
    latency: "< 2ms",
    description: "Optimized keyboard/touch screen UI designed for rapid checkout, barcode scanning, and split payments.",
    failover: "Runs isolated renderer process with automatic crash recovery",
    icon: Terminal,
  },
  {
    title: "Local SQLite Cache",
    role: "Zero-Latency Persistence",
    protocol: "SQLite WAL Mode",
    latency: "< 1ms",
    description: "All products, inventory ledgers, and transactions commit instantly to local disk. 100% functional without internet.",
    failover: "Automated daily SQLite backup with disk corruption verification",
    icon: Database,
  },
  {
    title: "Hardware Serial Driver",
    role: "Thermal Receipt & Cash Drawer",
    protocol: "ESC/POS USB / COM",
    latency: "< 12ms",
    description: "Raw binary ESC/POS command stream to 80mm thermal receipt printers and pulse-triggered cash drawer opening.",
    failover: "Virtual spooler queue retries print jobs if paper runs out",
    icon: Printer,
  },
  {
    title: "Cloud Ledger Sync Worker",
    role: "Distributed Cloud Ledger",
    protocol: "WebSockets / REST",
    latency: "Background Async",
    description: "Monitors internet connectivity. When online, batches pending offline transactions to centralized PostgreSQL.",
    failover: "Conflict-free resolution with timestamp vector clocks",
    icon: RefreshCw,
  },
];

export default function ArchitectureVisualizer() {
  const [activePipeline, setActivePipeline] = useState<ArchitectureType>("gds");
  const [selectedStepIndex, setSelectedStepIndex] = useState<number>(0);
  const [isMutedState, setIsMutedState] = useState(false);

  const currentSteps = activePipeline === "gds" ? GDS_PIPELINE : POS_PIPELINE;
  const currentStep = currentSteps[selectedStepIndex] || currentSteps[0];

  const handlePipelineChange = (type: ArchitectureType) => {
    playTabSwitchSound();
    setActivePipeline(type);
    setSelectedStepIndex(0);
  };

  const handleAudioToggle = () => {
    const nextMuted = toggleAudioMuted();
    setIsMutedState(nextMuted);
    if (!nextMuted) {
      playNodeSelectSound();
    }
  };

  return (
    <section id="architecture" className="relative z-10 border-t border-zinc-200 dark:border-white/10 bg-slate-50 dark:bg-black py-28 px-6 transition-colors duration-300">
      <div className="mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-3.5">
              <button
                type="button"
                onClick={() => playClickSound()}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-300 dark:border-white/15 bg-white dark:bg-white/5 text-xs text-zinc-700 dark:text-zinc-300 font-mono shadow-xs cursor-pointer hover:border-zinc-400 dark:hover:border-white/30 transition-colors"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-phosphor inline-block" />
                <span>systems --visualize --interactive</span>
              </button>

              <button
                type="button"
                onClick={handleAudioToggle}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-zinc-300 dark:border-white/15 bg-white dark:bg-white/5 text-xs text-zinc-700 dark:text-zinc-300 font-mono shadow-xs cursor-pointer hover:bg-zinc-100 dark:hover:bg-white/10 transition-colors"
                title="Toggle System Click Audio"
              >
                {isMutedState ? (
                  <>
                    <VolumeX className="w-3.5 h-3.5 text-zinc-400" />
                    <span className="text-[11px]">Audio: Muted</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-3.5 h-3.5 text-emerald-600 dark:text-phosphor animate-pulse" />
                    <span className="text-[11px] text-emerald-600 dark:text-phosphor font-medium">Haptic Audio: Active</span>
                  </>
                )}
              </button>
            </div>

            <h2 className="text-3xl sm:text-5xl font-medium tracking-tight text-zinc-900 dark:text-white">
              System Architecture Visualizer
            </h2>
          </div>
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 max-w-md leading-relaxed">
            Explore how Mohammad Asim designs resilient data flows — from global flight inventories to zero-latency offline POS checkout hardware.
          </p>
        </div>

        {/* Architecture Pipeline Switcher */}
        <div className="flex flex-wrap items-center gap-3 mb-8">
          <button
            type="button"
            onClick={() => handlePipelineChange("gds")}
            className={`flex items-center gap-2.5 px-4 py-2 rounded-xl font-mono text-xs transition-all cursor-pointer ${
              activePipeline === "gds"
                ? "bg-zinc-900 text-white dark:bg-white dark:text-black font-semibold shadow-md dark:shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                : "bg-white text-zinc-600 dark:bg-white/5 dark:text-zinc-400 hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-white/10 dark:hover:text-white border border-zinc-200 dark:border-white/10 shadow-xs"
            }`}
          >
            <Plane className="w-4 h-4" />
            <span>Amadeus GDS Flight Booking Engine</span>
          </button>

          <button
            type="button"
            onClick={() => handlePipelineChange("pos")}
            className={`flex items-center gap-2.5 px-4 py-2 rounded-xl font-mono text-xs transition-all cursor-pointer ${
              activePipeline === "pos"
                ? "bg-zinc-900 text-white dark:bg-white dark:text-black font-semibold shadow-md dark:shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                : "bg-white text-zinc-600 dark:bg-white/5 dark:text-zinc-400 hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-white/10 dark:hover:text-white border border-zinc-200 dark:border-white/10 shadow-xs"
            }`}
          >
            <Database className="w-4 h-4" />
            <span>Offline-First POS &amp; Hardware Engine</span>
          </button>
        </div>

        {/* Interactive Flow Stepper */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Pipeline Nodes Flow (Left 7 Cols) */}
          <div className="lg:col-span-7 space-y-3">
            <div className="text-xs font-mono text-zinc-500 uppercase tracking-wider mb-2 flex items-center justify-between">
              <span>Pipeline Stages (Click any node to inspect)</span>
              <span className="text-zinc-500 dark:text-zinc-400">{currentSteps.length} Stages</span>
            </div>

            {currentSteps.map((step, idx) => {
              const Icon = step.icon;
              const isSelected = selectedStepIndex === idx;

              return (
                <div
                  key={step.title}
                  onClick={() => {
                    playNodeSelectSound();
                    setSelectedStepIndex(idx);
                  }}
                  className={`group relative flex items-center justify-between p-4 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? "border-zinc-900/30 dark:border-white/40 bg-white dark:bg-white/10 shadow-md dark:shadow-[0_0_25px_rgba(255,255,255,0.08)] -translate-y-0.5"
                      : "border-zinc-200 dark:border-white/10 bg-white/70 dark:bg-white/[0.02] hover:bg-white dark:hover:bg-white/[0.06] hover:border-zinc-300 dark:hover:border-white/20 shadow-xs"
                  }`}
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div
                      className={`p-2.5 rounded-lg border transition-colors ${
                        isSelected
                          ? "bg-zinc-900 text-white border-zinc-900 dark:bg-white dark:text-black dark:border-white"
                          : "bg-zinc-100 dark:bg-white/5 text-zinc-500 dark:text-zinc-400 border-zinc-200 dark:border-white/10 group-hover:text-zinc-900 dark:group-hover:text-white"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="truncate">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[11px] text-zinc-400 dark:text-zinc-500">
                          0{idx + 1}.
                        </span>
                        <h4
                          className={`text-sm font-medium ${
                            isSelected ? "text-zinc-900 dark:text-white font-semibold" : "text-zinc-700 dark:text-zinc-200"
                          }`}
                        >
                          {step.title}
                        </h4>
                      </div>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate mt-0.5">
                        {step.role}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-white/5 dark:border-white/10 dark:text-phosphor">
                      {step.latency}
                    </span>
                    <ArrowRight
                      className={`w-4 h-4 transition-transform ${
                        isSelected ? "text-zinc-900 dark:text-white translate-x-0.5" : "text-zinc-400 dark:text-zinc-600"
                      }`}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Detailed Node Inspector (Right 5 Cols) */}
          <div className="lg:col-span-5">
            <div className="h-full rounded-2xl border border-zinc-200 dark:border-white/15 bg-white dark:bg-gradient-to-b dark:from-[#121214] dark:via-[#0b0b0c] dark:to-[#040404] p-6 flex flex-col justify-between shadow-xl relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-zinc-300 dark:via-white/30 to-transparent" />

              <div>
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-zinc-200 dark:border-white/10">
                  <span className="font-mono text-xs text-zinc-600 dark:text-zinc-400 uppercase tracking-wider flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-phosphor animate-pulse" />
                    Stage Inspector
                  </span>
                  <span className="font-mono text-xs text-zinc-500">
                    Protocol: <span className="text-zinc-900 dark:text-white font-medium">{currentStep.protocol}</span>
                  </span>
                </div>

                <div className="flex items-center gap-3 mb-3">
                  <div className="p-3 rounded-xl bg-zinc-100 dark:bg-white/10 border border-zinc-200 dark:border-white/15 text-zinc-900 dark:text-white">
                    <currentStep.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xl font-medium text-zinc-900 dark:text-white">
                      {currentStep.title}
                    </h3>
                    <p className="text-xs text-emerald-600 dark:text-phosphor font-mono">
                      {currentStep.role}
                    </p>
                  </div>
                </div>

                <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed mt-4">
                  {currentStep.description}
                </p>

                <div className="mt-6 pt-4 border-t border-zinc-200 dark:border-white/10 space-y-3">
                  <div
                    onClick={() => playClickSound()}
                    className="p-3 rounded-lg bg-zinc-50 dark:bg-white/[0.03] border border-zinc-200 dark:border-white/10 cursor-pointer hover:border-zinc-300 dark:hover:border-white/20 transition-colors"
                  >
                    <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-wider block mb-1">
                      Failover &amp; Reliability Strategy:
                    </span>
                    <p className="text-xs text-zinc-700 dark:text-zinc-300 font-mono flex items-start gap-1.5">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400 shrink-0 mt-0.5" />
                      <span>{currentStep.failover}</span>
                    </p>
                  </div>

                  <div
                    onClick={() => playClickSound()}
                    className="flex items-center justify-between p-3 rounded-lg bg-zinc-50 dark:bg-white/[0.03] border border-zinc-200 dark:border-white/10 text-xs font-mono cursor-pointer hover:border-zinc-300 dark:hover:border-white/20 transition-colors"
                  >
                    <span className="text-zinc-500">Target Latency:</span>
                    <span className="text-zinc-900 dark:text-white font-semibold">{currentStep.latency}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-zinc-200 dark:border-white/10 flex items-center justify-between font-mono text-[11px] text-zinc-500">
                <span>Architecture Verified</span>
                <span className="text-emerald-600 dark:text-emerald-400">&bull; Production Ready</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
