"use client";

import { useState } from "react";
import {
  ExternalLink,
  Terminal,
  Layers,
  ArrowUpRight,
  ShieldCheck,
  Check,
  Globe,
  Monitor,
  Database,
  Cpu,
} from "lucide-react";
import { playTabSwitchSound, playClickSound } from "@/lib/soundFX";

type ProjectCategory = "all" | "desktop" | "web" | "cms";

type Project = {
  name: string;
  url: string;
  tag: string;
  category: ProjectCategory;
  description: string;
  stack: string[];
  metrics: string;
  badgeColor: string;
  highlights: string[];
  codeSnippet?: string;
};

const PROJECTS: Project[] = [
  {
    name: "AMD Global",
    url: "https://amdglobal.de/",
    tag: "Aviation & GDS Travel Platform",
    category: "web",
    description:
      "Enterprise travel agency platform wired directly to the Amadeus GDS API for live flight inventories, multi-currency pricing, and custom Umrah reservation pipelines.",
    stack: ["Next.js 14", "Tailwind CSS", "Node.js API", "Amadeus GDS", "Redis"],
    metrics: "Sub-Second Flight Lookup · Multi-Currency",
    badgeColor: "text-sky-800 bg-sky-50 border-sky-200 dark:text-sky-300 dark:bg-sky-950/60 dark:border-sky-500/40",
    highlights: [
      "Integrated Amadeus Global Distribution System API for sub-second flight lookup.",
      "Custom multi-step booking engine with automated itinerary confirmation.",
      "Engineered responsive UI handling high seasonal traffic spikes seamlessly.",
    ],
  },
  {
    name: "OmniPOS",
    url: "https://omnipos-two.vercel.app/",
    tag: "Zero-Latency Desktop POS Runtime",
    category: "desktop",
    description:
      "Mission-critical point-of-sale desktop application built for high-throughput retail checkout counters and fast-food environments with 100% offline resilience.",
    stack: ["Electron JS", "React 18", "Local SQLite WAL", "ESC/POS Thermal", "Serial I/O"],
    metrics: "Zero Latency · 100% Offline Resilience",
    badgeColor: "text-emerald-800 bg-emerald-50 border-emerald-200 dark:text-emerald-300 dark:bg-emerald-950/60 dark:border-emerald-500/40",
    highlights: [
      "Hardware integration for thermal receipt printers (ESC/POS) and barcode scanners.",
      "Offline-first local SQLite caching ensuring non-stop operation during internet outages.",
      "Rapid touch-optimized counter interface cutting checkout duration by 40%.",
    ],
  },
  {
    name: "Rehmat Lawn Mowers",
    url: "https://rehmatlawnmowers.com/",
    tag: "Custom WordPress & WooCommerce Store",
    category: "cms",
    description:
      "Bespoke WordPress & WooCommerce commercial platform engineered for industrial lawn care equipment, machinery parts catalog, direct order processing, and customer quotation pipelines.",
    stack: ["WordPress", "WooCommerce", "PHP", "Custom Theme", "MySQL", "SEO Schema"],
    metrics: "Custom WooCommerce · Catalog & Inquiries",
    badgeColor: "text-emerald-800 bg-emerald-50 border-emerald-200 dark:text-emerald-300 dark:bg-emerald-950/60 dark:border-emerald-500/40",
    highlights: [
      "Custom WooCommerce theme engineered for machinery catalogs, spare parts, and equipment specs.",
      "Integrated quotation and inquiry pipelines routing directly to sales staff via WhatsApp & email.",
      "Optimized database queries and media assets ensuring fast loading and high search visibility.",
    ],
  },
  {
    name: "Dr. Zrinka Practice",
    url: "http://dr-zrinka.com/",
    tag: "Custom WordPress Medical Platform",
    category: "cms",
    description:
      "Modern healthcare practice web presence engineered for client trust, specialized treatment portfolios, and seamless consultation inquiry flows.",
    stack: ["WordPress", "Custom PHP Theme", "ACF Pro", "WP REST API", "SEO Schema"],
    metrics: "Patient Lead Pipeline · Custom CMS · 98 PageSpeed",
    badgeColor: "text-purple-800 bg-purple-50 border-purple-200 dark:text-purple-300 dark:bg-purple-950/60 dark:border-purple-500/40",
    highlights: [
      "Designed responsive layout adhering to medical credibility and privacy conventions.",
      "Configured custom inquiry intake forms routing directly into practice management.",
      "Applied structured JSON-LD schema for local medical search optimization.",
    ],
  },
  {
    name: "Texan Hills Inc.",
    url: "http://texanhillsinc.com/",
    tag: "Zero-Overhead Corporate Architecture",
    category: "web",
    description:
      "Engineered from scratch without bloated frameworks to demonstrate pure web standards performance, optimal Core Web Vitals, and instant first-paint times.",
    stack: ["HTML5", "Modern CSS3", "Vanilla JS", "Performance Optimization"],
    metrics: "100/100 Core Web Vitals · Instant FCP",
    badgeColor: "text-teal-800 bg-teal-50 border-teal-200 dark:text-teal-300 dark:bg-teal-950/60 dark:border-teal-500/40",
    highlights: [
      "Zero client-side JS runtime overhead for immediate DOM rendering.",
      "Self-contained semantic styling with optimal paint performance.",
      "Flawless cross-browser rendering across legacy and modern mobile devices.",
    ],
  },
];

export default function Projects() {
  const [filter, setFilter] = useState<ProjectCategory>("all");

  const filteredProjects =
    filter === "all" ? PROJECTS : PROJECTS.filter((p) => p.category === filter);

  return (
    <section id="projects" className="relative z-10 border-t border-zinc-200 dark:border-white/10 bg-white dark:bg-black py-28 px-6 transition-colors duration-300">
      <div className="mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-300 dark:border-white/15 bg-zinc-50 dark:bg-white/5 text-xs text-zinc-700 dark:text-zinc-300 font-mono mb-3.5 shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-phosphor inline-block" />
              <span>ls -la ./production/systems</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-medium tracking-tight text-zinc-900 dark:text-white">
              Selected Production Systems
            </h2>
          </div>
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 max-w-md leading-relaxed">
            Battle-tested software in active production — from international flight booking APIs to counter POS runtimes processing daily retail volume.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-10 pb-4 border-b border-zinc-200 dark:border-white/10">
          <span className="font-mono text-xs text-zinc-500 mr-2">Category:</span>
          {(
            [
              { id: "all", label: "All Deployments" },
              { id: "desktop", label: "Desktop POS & Hardware" },
              { id: "web", label: "Aviation & Web Platforms" },
              { id: "cms", label: "WordPress & Headless CMS" },
            ] as Array<{ id: ProjectCategory; label: string }>
          ).map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => {
                playTabSwitchSound();
                setFilter(tab.id);
              }}
              className={`px-3.5 py-1.5 rounded-full font-mono text-xs transition-all cursor-pointer ${
                filter === tab.id
                  ? "bg-zinc-900 text-white dark:bg-white dark:text-black font-semibold shadow-md dark:shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                  : "bg-zinc-100 text-zinc-600 dark:bg-white/5 dark:text-zinc-400 hover:bg-zinc-200 hover:text-zinc-900 dark:hover:bg-white/10 dark:hover:text-white border border-zinc-200 dark:border-white/10"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((p) => (
            <div
              key={p.name}
              className="group relative flex flex-col justify-between rounded-2xl border border-slate-200/90 dark:border-white/10 bg-white dark:bg-gradient-to-b dark:from-[#111114] dark:via-[#0a0a0c] dark:to-[#040405] p-6 sm:p-7 transition-all duration-300 hover:border-slate-300 dark:hover:border-white/30 shadow-[0_2px_10px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_0_40px_rgba(255,255,255,0.08)] hover:-translate-y-1 overflow-hidden"
            >
              {/* Top ambient highlight */}
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-slate-300 dark:via-white/20 to-transparent group-hover:via-slate-400 dark:group-hover:via-white/60 transition-colors" />

              <div>
                {/* Browser Mockup Bar */}
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/10 pb-3 mb-4">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-red-500/80" />
                    <span className="w-2 h-2 rounded-full bg-yellow-500/80" />
                    <span className="w-2 h-2 rounded-full bg-green-500/80" />
                    <span className="font-mono text-[10px] text-slate-500 dark:text-zinc-500 ml-1.5 truncate max-w-[140px] font-medium">
                      {p.url.replace("https://", "").replace("http://", "")}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
                    </span>
                    <span className="font-mono text-[10px] text-emerald-700 dark:text-emerald-400 font-semibold">Live</span>
                  </div>
                </div>

                {/* Tag & Badge */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span
                    className={`text-[10.5px] font-mono tracking-wider uppercase px-2.5 py-1 rounded-md border font-semibold shadow-2xs ${p.badgeColor}`}
                  >
                    {p.tag}
                  </span>
                </div>

                {/* Project Title */}
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center justify-between group-hover:text-black dark:group-hover:text-white transition-colors">
                  <span>{p.name}</span>
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-lg border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-500 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-white hover:border-slate-300 dark:hover:border-white/30 hover:bg-slate-100 dark:hover:bg-white/10 transition-all cursor-pointer shadow-2xs"
                    aria-label={`Open ${p.name}`}
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </h3>

                <p className="mt-3 text-sm text-slate-600 dark:text-zinc-400 leading-relaxed font-normal">
                  {p.description}
                </p>

                {/* Architecture Highlights */}
                <div className="mt-5 pt-4 border-t border-slate-100 dark:border-white/10 space-y-2">
                  <span className="font-mono text-[10px] text-slate-500 dark:text-zinc-400 uppercase tracking-wider block font-semibold">
                    Key Architecture Solutions:
                  </span>
                  {p.highlights.map((h, hIdx) => (
                    <div key={hIdx} className="flex items-start gap-2 text-xs text-slate-700 dark:text-zinc-300">
                      <span className="text-emerald-600 dark:text-phosphor shrink-0 mt-0.5 font-bold">&bull;</span>
                      <span className="leading-snug">{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stack Chips & Action */}
              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-white/10 flex flex-col gap-3">
                <div className="flex flex-wrap gap-1.5">
                  {p.stack.map((tech) => (
                    <span
                      key={tech}
                      onClick={() => playClickSound()}
                      className="px-2 py-0.5 rounded bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 font-mono text-[10px] text-slate-700 dark:text-zinc-300 font-medium cursor-pointer hover:border-slate-300 dark:hover:border-white/20 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between text-xs font-mono pt-1">
                  <span className="text-slate-500 dark:text-zinc-400 font-medium">{p.metrics}</span>
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-900 dark:text-white hover:underline flex items-center gap-1 font-semibold cursor-pointer"
                  >
                    <span>Launch</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
