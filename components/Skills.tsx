"use client";

import {
  Globe,
  Server,
  Monitor,
  Bot,
  Layers,
  CheckCircle2,
  Cpu,
  Database,
  Printer,
  Sparkles,
  Zap,
  Layout,
  Code2,
  ShoppingBag,
} from "lucide-react";

export default function Skills() {
  return (
    <section id="skills" className="relative z-10 border-t border-zinc-200 dark:border-white/10 bg-slate-50 dark:bg-black py-28 px-6 transition-colors duration-300">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-300 dark:border-white/15 bg-white dark:bg-white/5 text-xs text-zinc-700 dark:text-zinc-300 font-mono mb-3.5 shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-phosphor inline-block" />
              <span>capabilities --matrix --bento</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-medium tracking-tight text-zinc-900 dark:text-white">
              Technical Capabilities
            </h2>
          </div>
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 max-w-md leading-relaxed">
            Seven years of disciplined engineering across frontend reactivity, offline desktop POS hardware, flight GDS protocols, and AI automation.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Bento Card 1: Core Web & Frontend (Span 2 Cols on MD) */}
          <div className="md:col-span-2 rounded-2xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-gradient-to-b dark:from-[#131317] dark:via-[#0c0c0e] dark:to-[#040405] p-7 sm:p-8 transition-all duration-300 hover:border-zinc-400 dark:hover:border-white/25 hover:shadow-xl dark:hover:shadow-[0_0_35px_rgba(255,255,255,0.06)] relative overflow-hidden group">
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-zinc-300 dark:via-white/30 to-transparent" />

            <div className="flex items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-zinc-100 dark:bg-white/10 border border-zinc-200 dark:border-white/15 text-zinc-900 dark:text-white">
                  <Globe className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-medium text-zinc-900 dark:text-white">
                    Core Web Architecture &amp; Frontend
                  </h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    High-performance client architectures, reactivity &amp; design systems
                  </p>
                </div>
              </div>
              <span className="hidden sm:inline-block font-mono text-[10px] text-emerald-600 dark:text-emerald-400 px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-500/30">
                Primary Specialty
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mt-6">
              {[
                { name: "React 18 / 19", level: "Expert" },
                { name: "Next.js 14 App Router", level: "Senior" },
                { name: "TypeScript", level: "Advanced" },
                { name: "Tailwind CSS", level: "Expert" },
                { name: "Zustand / Redux", level: "Advanced" },
                { name: "Framer Motion", level: "Proficient" },
                { name: "Web Vitals Optimization", level: "100/100 Score" },
                { name: "WCAG Accessibility", level: "Compliant" },
                { name: "Semantic HTML5/CSS3", level: "Mastery" },
              ].map((s) => (
                <div
                  key={s.name}
                  className="p-2.5 rounded-lg border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-white/[0.03] hover:bg-zinc-100 dark:hover:bg-white/[0.08] hover:border-zinc-300 dark:hover:border-white/20 transition-colors"
                >
                  <div className="font-mono text-xs text-zinc-800 dark:text-zinc-200 truncate font-medium">{s.name}</div>
                  <div className="font-mono text-[10px] text-emerald-600 dark:text-phosphor mt-0.5">{s.level}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Bento Card 2: Desktop POS Runtimes (Span 1 Col) */}
          <div className="rounded-2xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-gradient-to-b dark:from-[#131317] dark:via-[#0c0c0e] dark:to-[#040405] p-7 sm:p-8 transition-all duration-300 hover:border-zinc-400 dark:hover:border-white/25 hover:shadow-xl dark:hover:shadow-[0_0_35px_rgba(255,255,255,0.06)] relative overflow-hidden group">
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-zinc-300 dark:via-white/30 to-transparent" />

            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-xl bg-zinc-100 dark:bg-white/10 border border-zinc-200 dark:border-white/15 text-zinc-900 dark:text-white">
                <Monitor className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-medium text-zinc-900 dark:text-white">Desktop POS</h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">Zero-latency retail counter hardware</p>
              </div>
            </div>

            <div className="space-y-2.5 mt-6">
              {[
                { name: "Electron JS Runtime", desc: "Native shell & window control" },
                { name: "Offline SQLite WAL", desc: "Instant local disk persistence" },
                { name: "ESC/POS Thermal", desc: "Direct binary receipt printing" },
                { name: "Barcode Serial I/O", desc: "USB COM port hardware listening" },
                { name: "Auto-Update Packaging", desc: "NSIS / DMG distribution pipelines" },
              ].map((s) => (
                <div
                  key={s.name}
                  className="p-2.5 rounded-lg border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-white/[0.03] hover:bg-zinc-100 dark:hover:bg-white/[0.08] transition-colors"
                >
                  <div className="font-mono text-xs text-zinc-900 dark:text-white font-medium">{s.name}</div>
                  <div className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5">{s.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Bento Card 3: Backend & Flight GDS (Span 1 Col) */}
          <div className="rounded-2xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-gradient-to-b dark:from-[#131317] dark:via-[#0c0c0e] dark:to-[#040405] p-7 sm:p-8 transition-all duration-300 hover:border-zinc-400 dark:hover:border-white/25 hover:shadow-xl dark:hover:shadow-[0_0_35px_rgba(255,255,255,0.06)] relative overflow-hidden group">
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-zinc-300 dark:via-white/30 to-transparent" />

            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-xl bg-zinc-100 dark:bg-white/10 border border-zinc-200 dark:border-white/15 text-zinc-900 dark:text-white">
                <Server className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-medium text-zinc-900 dark:text-white">Backend &amp; APIs</h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">Distributed services &amp; GDS</p>
              </div>
            </div>

            <div className="space-y-2 mt-5">
              {[
                "Amadeus GDS Flight SOAP/REST API",
                "Node.js & Express Architecture",
                "PostgreSQL & SQLite Data Models",
                "RESTful Endpoints & Webhooks",
                "JWT & Secure Role Authentication",
                "Redis Session Caching",
              ].map((tech) => (
                <div key={tech} className="flex items-center gap-2 text-xs font-mono text-zinc-700 dark:text-zinc-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-phosphor shrink-0" />
                  <span>{tech}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bento Card 4: Autonomous AI Agents (Span 2 Cols on MD) */}
          <div className="md:col-span-2 rounded-2xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-gradient-to-b dark:from-[#131317] dark:via-[#0c0c0e] dark:to-[#040405] p-7 sm:p-8 transition-all duration-300 hover:border-zinc-400 dark:hover:border-white/25 hover:shadow-xl dark:hover:shadow-[0_0_35px_rgba(255,255,255,0.06)] relative overflow-hidden group">
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-zinc-300 dark:via-white/30 to-transparent" />

            <div className="flex items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-zinc-100 dark:bg-white/10 border border-zinc-200 dark:border-white/15 text-zinc-900 dark:text-white">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-medium text-zinc-900 dark:text-white">
                    Autonomous AI Agents &amp; Next-Gen Automation
                  </h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    LLM tool execution, autonomous function calling &amp; automated pipelines
                  </p>
                </div>
              </div>
              <span className="hidden sm:inline-block font-mono text-[10px] text-cyan-600 dark:text-cyan-400 px-2.5 py-1 rounded-full bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-200 dark:border-cyan-500/30">
                Cutting-Edge
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6">
              <div className="p-3 rounded-xl bg-zinc-50 dark:bg-white/[0.03] border border-zinc-200 dark:border-white/10">
                <div className="text-xs font-mono text-zinc-900 dark:text-white font-medium flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-amber-500 dark:text-amber" />
                  Function Calling &amp; Tool Use
                </div>
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1 leading-relaxed">
                  Autonomous agents executing external APIs, database lookups, and inventory updates.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-zinc-50 dark:bg-white/[0.03] border border-zinc-200 dark:border-white/10">
                <div className="text-xs font-mono text-zinc-900 dark:text-white font-medium flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5 text-emerald-600 dark:text-phosphor" />
                  Context &amp; Vector RAG
                </div>
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1 leading-relaxed">
                  Domain-specific knowledge retrieval with embeddings for customer triage and support.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-zinc-50 dark:bg-white/[0.03] border border-zinc-200 dark:border-white/10">
                <div className="text-xs font-mono text-zinc-900 dark:text-white font-medium flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
                  Structured JSON Pipeline
                </div>
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1 leading-relaxed">
                  Reliable schema-validated outputs for automated invoicing, parsing, and ledger sync.
                </p>
              </div>
            </div>
          </div>

          {/* Bento Card 5: WordPress, WooCommerce & Headless CMS (Span 3 Cols) */}
          <div className="md:col-span-3 rounded-2xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-gradient-to-b dark:from-[#131317] dark:via-[#0c0c0e] dark:to-[#040405] p-7 sm:p-8 transition-all duration-300 hover:border-zinc-400 dark:hover:border-white/25 hover:shadow-xl dark:hover:shadow-[0_0_35px_rgba(255,255,255,0.06)] relative overflow-hidden group">
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-zinc-300 dark:via-white/30 to-transparent" />

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-500/30 text-blue-600 dark:text-blue-400">
                  <Layout className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-medium text-zinc-900 dark:text-white">
                    WordPress, WooCommerce &amp; Headless CMS Architecture
                  </h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    Bespoke theme engineering, high-conversion WooCommerce stores, and decoupled REST API integrations
                  </p>
                </div>
              </div>
              <span className="inline-block font-mono text-[10px] text-blue-600 dark:text-blue-400 px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-500/30 shrink-0">
                7+ Years Production Experience
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl bg-zinc-50 dark:bg-white/[0.03] border border-zinc-200 dark:border-white/10">
                <div className="font-mono text-xs text-zinc-900 dark:text-white font-semibold flex items-center gap-1.5 mb-1.5">
                  <Code2 className="w-3.5 h-3.5 text-blue-500" />
                  Custom Theme Development
                </div>
                <p className="text-[11px] text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Clean hand-coded PHP templates, modern Tailwind/SCSS asset pipelines, semantic layouts, and zero bloat from visual page builders.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-zinc-50 dark:bg-white/[0.03] border border-zinc-200 dark:border-white/10">
                <div className="font-mono text-xs text-zinc-900 dark:text-white font-semibold flex items-center gap-1.5 mb-1.5">
                  <ShoppingBag className="w-3.5 h-3.5 text-emerald-500" />
                  WooCommerce Engineering
                </div>
                <p className="text-[11px] text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Complex product variations, multi-currency checkout, custom payment gateways (Stripe, PayPal, Bank APIs), and automated webhooks.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-zinc-50 dark:bg-white/[0.03] border border-zinc-200 dark:border-white/10">
                <div className="font-mono text-xs text-zinc-900 dark:text-white font-semibold flex items-center gap-1.5 mb-1.5">
                  <Layers className="w-3.5 h-3.5 text-purple-500" />
                  Headless WP &amp; REST APIs
                </div>
                <p className="text-[11px] text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Decoupled architectures using WordPress as an editorial backend paired with Next.js &amp; React frontends for sub-second page loads.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-zinc-50 dark:bg-white/[0.03] border border-zinc-200 dark:border-white/10">
                <div className="font-mono text-xs text-zinc-900 dark:text-white font-semibold flex items-center gap-1.5 mb-1.5">
                  <Zap className="w-3.5 h-3.5 text-amber-500" />
                  ACF Pro &amp; Speed Tuning
                </div>
                <p className="text-[11px] text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Advanced Custom Fields Pro flexible modules, relational schemas, Redis object caching, and Core Web Vitals optimization (95+ score).
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
