"use client";

import { ArrowUp, Terminal, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-zinc-200 dark:border-white/10 bg-slate-50 dark:bg-black py-12 px-6 transition-colors duration-300">
      <div className="mx-auto max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-6 font-mono text-xs text-zinc-500 dark:text-zinc-400">
        <div className="flex items-center gap-2.5">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-zinc-700 dark:text-zinc-300 font-medium">
            Mohammad Asim &bull; Sargodha, Pakistan (UTC+5)
          </span>
        </div>

        <p className="text-zinc-500 text-center">
          &copy; {new Date().getFullYear()} Engineered with Next.js 14, Tailwind CSS &amp; Precision Architecture.
        </p>

        <div className="flex items-center gap-4">
          <a
            href="mailto:aasimameer06@gmail.com"
            className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors"
          >
            Email
          </a>
          <span className="text-zinc-300 dark:text-zinc-600">&bull;</span>
          <a
            href="https://wa.me/923060112606"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors"
          >
            WhatsApp
          </a>
          <span className="text-zinc-300 dark:text-zinc-600">&bull;</span>
          <a
            href="#top"
            className="text-zinc-900 hover:text-zinc-600 dark:text-white dark:hover:text-zinc-300 transition-colors flex items-center gap-1 font-medium"
          >
            <span>Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
