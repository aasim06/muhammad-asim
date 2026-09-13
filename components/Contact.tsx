"use client";

import { useState } from "react";
import {
  Mail,
  Copy,
  Check,
  MessageSquare,
  Phone,
  Clock,
  Send,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [sentSuccess, setSentSuccess] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText("aasimameer06@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleQuickSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    // Dispatch to mailto with user's name & message
    const subject = encodeURIComponent(`Project Inquiry from ${name || "Client"}`);
    const body = encodeURIComponent(
      `Hi Mohammad Asim,\n\n${message}\n\nBest regards,\n${name || "Anonymous"}`
    );
    window.location.href = `mailto:aasimameer06@gmail.com?subject=${subject}&body=${body}`;
    setSentSuccess(true);
    setTimeout(() => setSentSuccess(false), 4000);
  };

  return (
    <section id="contact" className="relative z-10 border-t border-zinc-200 dark:border-white/10 bg-slate-50 dark:bg-black py-32 px-6 transition-colors duration-300">
      <div className="mx-auto max-w-5xl">
        {/* Main Glass Card */}
        <div className="relative rounded-3xl border border-zinc-200 dark:border-white/15 bg-white dark:bg-gradient-to-b dark:from-[#141418] dark:via-[#0b0b0e] dark:to-[#040405] p-8 sm:p-14 text-center overflow-hidden shadow-2xl">
          {/* Subtle top spotlights */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-zinc-300 dark:via-white/50 to-transparent" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-28 bg-emerald-500/[0.04] dark:bg-white/[0.05] blur-3xl pointer-events-none" />

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-50 dark:bg-emerald-950/20 text-xs text-emerald-700 dark:text-emerald-300 font-mono mb-6 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
            <span>Open for Strategic Technical Engagements</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-zinc-900 dark:text-white mb-6">
            Let&apos;s build mission-critical <br />
            <span className="bg-gradient-to-r from-zinc-700 via-zinc-500 to-zinc-800 dark:from-zinc-200 dark:via-zinc-400 dark:to-zinc-600 bg-clip-text text-transparent">
              software that scales.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Whether you need a zero-latency desktop POS runtime, an Amadeus GDS integration, or an autonomous AI workflow — let&apos;s discuss architecture and execution.
          </p>

          {/* Quick Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3.5 mb-12">
            <a
              href="mailto:aasimameer06@gmail.com?subject=Technical%20Consultation%20%E2%80%94%20Mohammad%20Asim"
              className="btn btn-solid h-12 px-7 text-sm font-medium shadow-md"
            >
              <Mail className="w-4 h-4 mr-2" />
              <span>Email Directly</span>
            </a>

            <button
              type="button"
              onClick={copyEmail}
              className="btn btn-ghost hero-ghost h-12 px-6 text-sm font-medium cursor-pointer"
            >
              {copied ? (
                <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-2 font-medium">
                  <Check className="w-4 h-4" />
                  Email Copied to Clipboard!
                </span>
              ) : (
                <span className="flex items-center gap-2 text-zinc-700 dark:text-zinc-200">
                  <Copy className="w-4 h-4 text-zinc-400" />
                  Copy: aasimameer06@gmail.com
                </span>
              )}
            </button>

            <a
              href="https://wa.me/923060112606"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost hero-ghost h-12 px-6 text-sm font-medium"
            >
              <MessageSquare className="w-4 h-4 mr-2 text-emerald-600 dark:text-emerald-400" />
              <span>WhatsApp Chat</span>
            </a>
          </div>

          {/* Interactive Fast Inquiry Form */}
          <div className="max-w-xl mx-auto p-6 rounded-2xl border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-white/[0.02] text-left mb-10">
            <div className="flex items-center justify-between mb-3 font-mono text-xs text-zinc-500 dark:text-zinc-400">
              <span className="flex items-center gap-1.5 text-zinc-800 dark:text-zinc-200 font-medium">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-phosphor" />
                Quick Message Dispatch
              </span>
              <span className="text-zinc-400 dark:text-zinc-500">Opens direct email draft</span>
            </div>

            <form onSubmit={handleQuickSend} className="space-y-3">
              <input
                type="text"
                placeholder="Your Name or Company (e.g. Alex, Head of Tech)"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-black/60 text-xs sm:text-sm text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:border-zinc-400 dark:focus:border-white/30 font-sans shadow-2xs"
              />
              <textarea
                rows={3}
                required
                placeholder="Describe your project, timeline, or architecture needs..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-black/60 text-xs sm:text-sm text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:border-zinc-400 dark:focus:border-white/30 font-sans resize-none shadow-2xs"
              />
              <button
                type="submit"
                className="w-full btn btn-solid h-10 text-xs font-semibold uppercase tracking-wider font-mono flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send Quick Dispatch</span>
              </button>
            </form>

            {sentSuccess && (
              <p className="mt-2 text-center text-xs font-mono text-emerald-600 dark:text-emerald-400 font-medium">
                Draft created! Check your email client to send.
              </p>
            )}
          </div>

          {/* Quick Specifications Info Grid */}
          <div className="pt-8 border-t border-zinc-200 dark:border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-4 text-left font-mono text-xs text-zinc-500 dark:text-zinc-400">
            <div className="p-4 rounded-xl border border-zinc-200 dark:border-white/10 bg-zinc-50/70 dark:bg-white/[0.02]">
              <span className="text-zinc-500 dark:text-zinc-500 block mb-1 uppercase tracking-wider text-[10px]">
                Direct Line
              </span>
              <a href="tel:+923060112606" className="text-zinc-900 dark:text-white hover:underline text-sm block font-sans font-medium">
                +92 306 0112606
              </a>
              <span className="text-zinc-400 dark:text-zinc-500 text-[11px]">Phone &bull; WhatsApp &bull; SMS</span>
            </div>

            <div className="p-4 rounded-xl border border-zinc-200 dark:border-white/10 bg-zinc-50/70 dark:bg-white/[0.02]">
              <span className="text-zinc-500 dark:text-zinc-500 block mb-1 uppercase tracking-wider text-[10px]">
                Primary Timezone
              </span>
              <span className="text-zinc-900 dark:text-white text-sm block font-sans font-medium">
                Sargodha, Pakistan
              </span>
              <span className="text-zinc-400 dark:text-zinc-500 text-[11px]">PKT (UTC+5) &bull; Global Remote</span>
            </div>

            <div className="p-4 rounded-xl border border-zinc-200 dark:border-white/10 bg-zinc-50/70 dark:bg-white/[0.02]">
              <span className="text-zinc-500 dark:text-zinc-500 block mb-1 uppercase tracking-wider text-[10px]">
                Engagement Formats
              </span>
              <span className="text-zinc-900 dark:text-white text-sm block font-sans font-medium">
                Contract &bull; Systems Architecture
              </span>
              <span className="text-emerald-600 dark:text-emerald-400 text-[11px] font-medium">Direct Principal Engineer</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
