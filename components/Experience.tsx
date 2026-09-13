"use client";

import { Briefcase, Calendar, MapPin, CheckCircle2 } from "lucide-react";

type Role = {
  company: string;
  role: string;
  period: string;
  location: string;
  summary: string;
  achievements: string[];
  technologies: string[];
};

const ROLES: Role[] = [
  {
    company: "Specialized Engineering / Independent",
    role: "Senior Desktop & Systems Engineer",
    period: "2024 — Present",
    location: "Sargodha, Pakistan / Remote",
    summary:
      "Engineering mission-critical desktop POS applications and automated AI agent workflows for international retailers, inventory distribution hubs, and fast-food chains.",
    achievements: [
      "Architected zero-latency desktop POS software running on Electron JS with local SQLite caching for 100% offline uptime.",
      "Integrated hardware thermal receipt printers (ESC/POS), cash drawers, and barcode scanners directly via Node serial protocols.",
      "Built autonomous AI agent prototypes for inventory replenishment forecasting and ticket triage.",
    ],
    technologies: ["Electron JS", "React 18", "Node.js", "SQLite WAL", "Tauri", "AI Agents"],
  },
  {
    company: "Drudots Technology",
    role: "Full-Stack Web & Systems Developer",
    period: "2022 — 2024",
    location: "Lahore, Pakistan",
    summary:
      "Delivered high-performance customer-facing web platforms, headless WordPress architectures, and custom Node.js middleware integrations.",
    achievements: [
      "Developed headless WordPress engines connected to Next.js and React frontends, improving PageSpeed scores by 45%.",
      "Engineered bespoke REST API endpoints for secure multi-tenant customer portals and transaction logs.",
      "Collaborated across agile sprints with product designers and QA engineers to ensure enterprise-grade stability.",
    ],
    technologies: ["React JS", "Node.js", "WordPress Headless", "PHP", "REST APIs", "Tailwind CSS"],
  },
  {
    company: "PurLogic",
    role: "Frontend Engineer — React JS",
    period: "2021 — 2022",
    location: "Pakistan / Remote",
    summary:
      "Designed and shipped modular component architectures, interactive web dashboards, and state-driven single-page applications.",
    achievements: [
      "Engineered reusable design systems and UI component libraries adhering strictly to WCAG accessibility guidelines.",
      "Optimized client-side bundle sizes and memory usage, eliminating unnecessary component re-renders.",
    ],
    technologies: ["React JS", "TypeScript", "Redux Toolkit", "REST APIs", "Modern CSS"],
  },
  {
    company: "IT Extension",
    role: "Frontend Developer",
    period: "2019 — 2021",
    location: "Pakistan",
    summary:
      "Spearheaded UI implementation for diverse commercial clients, transforming high-fidelity Figma mockups into pixel-perfect responsive web interfaces.",
    achievements: [
      "Shipped over 15 responsive web applications with consistent cross-browser performance across Safari, Chrome, and Firefox.",
      "Structured maintainable styling guidelines and asset pipelines.",
    ],
    technologies: ["JavaScript (ES6+)", "HTML5/CSS3", "Bootstrap", "jQuery", "Git"],
  },
  {
    company: "RZ Technology",
    role: "Associate Frontend Developer",
    period: "2017 — 2019",
    location: "Pakistan",
    summary:
      "Commenced professional software engineering career focusing on foundational JavaScript execution, web standards, and customer portal styling.",
    achievements: [
      "Gained deep foundation in asynchronous JavaScript, DOM manipulation, and semantic HTML5 architectures.",
    ],
    technologies: ["JavaScript", "HTML5", "CSS3", "Responsive Design"],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="relative z-10 border-t border-zinc-200 dark:border-white/10 bg-white dark:bg-black py-28 px-6 transition-colors duration-300">
      <div className="mx-auto max-w-5xl">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-300 dark:border-white/15 bg-zinc-50 dark:bg-white/5 text-xs text-zinc-700 dark:text-zinc-300 font-mono mb-3.5 shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-phosphor inline-block" />
              <span>timeline --detailed --chronological</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-medium tracking-tight text-zinc-900 dark:text-white">
              Engineering Track Record
            </h2>
          </div>
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 max-w-md leading-relaxed">
            Over seven continuous years architecting and shipping mission-critical desktop POS and web platforms.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative pl-6 sm:pl-10 space-y-10 before:absolute before:left-2 sm:before:left-3 before:top-3 before:bottom-3 before:w-[1px] before:bg-gradient-to-b before:from-zinc-400 dark:before:from-white/40 before:via-zinc-200 dark:before:via-white/15 before:to-transparent">
          {ROLES.map((r, i) => (
            <div key={r.company} className="relative group">
              {/* Timeline Indicator Dot */}
              <div className="absolute -left-[27px] sm:-left-[39px] top-2 w-4 h-4 rounded-full border border-zinc-400 dark:border-white/30 bg-white dark:bg-black flex items-center justify-center group-hover:border-emerald-500 dark:group-hover:border-phosphor transition-colors shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-900 dark:bg-white group-hover:bg-emerald-500 dark:group-hover:bg-phosphor transition-colors" />
              </div>

              {/* Experience Card */}
              <div className="rounded-2xl border border-zinc-200 dark:border-white/10 bg-slate-50/70 dark:bg-gradient-to-b dark:from-[#121215] dark:via-[#0a0a0c] dark:to-[#040404] p-6 sm:p-8 transition-all duration-300 hover:border-zinc-400 dark:hover:border-white/25 hover:shadow-xl dark:hover:shadow-[0_0_35px_rgba(255,255,255,0.05)]">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 border-b border-zinc-200 dark:border-white/10 pb-4 mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono text-xs text-emerald-600 dark:text-phosphor font-medium tracking-wider uppercase">
                        {r.period}
                      </span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-medium text-zinc-900 dark:text-white">
                      {r.role}
                    </h3>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-500 dark:text-zinc-400 mt-1.5 font-mono">
                      <span className="text-zinc-800 dark:text-zinc-200 font-semibold">{r.company}</span>
                      <span>&bull;</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-zinc-400 dark:text-zinc-500" />
                        {r.location}
                      </span>
                    </div>
                  </div>

                  {i === 0 && (
                    <span className="self-start px-2.5 py-1 rounded-full font-mono text-[10px] text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-500/30">
                      Current Focus
                    </span>
                  )}
                </div>

                <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed mb-5">
                  {r.summary}
                </p>

                {/* Key Achievements */}
                <div className="space-y-2 mb-6">
                  {r.achievements.map((ach, aIdx) => (
                    <div key={aIdx} className="flex items-start gap-2.5 text-xs text-zinc-600 dark:text-zinc-400">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-phosphor shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{ach}</span>
                    </div>
                  ))}
                </div>

                {/* Tech Chips */}
                <div className="pt-4 border-t border-zinc-200 dark:border-white/10 flex flex-wrap gap-1.5">
                  {r.technologies.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-0.5 rounded-full bg-white dark:bg-white/5 border border-zinc-200 dark:border-white/10 font-mono text-[10px] text-zinc-700 dark:text-zinc-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
