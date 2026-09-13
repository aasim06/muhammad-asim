"use client";

import { useState, useEffect } from "react";
import VesperHeader from "@/components/VesperHeader";
import Hero from "@/components/Hero";
import VesperStats from "@/components/VesperStats";
import ArchitectureVisualizer from "@/components/ArchitectureVisualizer";
import InteractivePlaygrounds from "@/components/InteractivePlaygrounds";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import CommandPalette from "@/components/CommandPalette";

export default function Home() {
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 30 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Calculate relative percentage coordinates
      const x = Math.round((e.clientX / window.innerWidth) * 100);
      const y = Math.round((e.clientY / window.innerHeight) * 100);
      setMousePos({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <>
      {/* Subtle Grain Overlay */}
      <div className="grain" aria-hidden="true" />

      {/* Dynamic Cursor Spotlight & Ambient Radial Mesh with Exact Vesper Fluid Waves */}
      <div className="hero-photo fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        {/* Exact Vesper Fluid Waves Video (Active in Dark Mode for Liquid Metal look) */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover object-center dark:opacity-80 opacity-0 transition-opacity duration-700 hidden dark:block"
          style={{ filter: "contrast(1.08) brightness(0.92)" }}
        >
          <source src="/hero-waves.mp4" type="video/mp4" />
          <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260818_072341_50851634-bbc3-4c33-9acc-7647d4db44aa.mp4" type="video/mp4" />
        </video>

        {/* Light Mode Luxury Ambient Aura & Subtle Top Glow */}
        <div className="absolute inset-0 dark:hidden bg-[radial-gradient(ellipse_90%_50%_at_50%_-10%,rgba(14,165,233,0.08),rgba(16,185,129,0.04)_50%,transparent_80%)]" />

        {/* Dynamic Cursor-following Spotlight */}
        <div
          className="absolute inset-0 transition-opacity duration-500 opacity-40 pointer-events-none"
          style={{
            background: `radial-gradient(800px circle at ${mousePos.x}% ${mousePos.y}%, rgba(120, 120, 120, 0.05), transparent 45%)`,
          }}
        />

        {/* Subtle Cyber Engineering Grid */}
        <div
          className="absolute inset-0 opacity-[0.08] dark:opacity-[0.16] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(128, 128, 128, 0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(128, 128, 128, 0.12) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
            maskImage: "radial-gradient(ellipse 90% 60% at 50% 10%, #000 60%, transparent 100%)",
            WebkitMaskImage: "radial-gradient(ellipse 90% 60% at 50% 10%, #000 60%, transparent 100%)",
          }}
        />

        {/* Scrim Overlay: Soft fade for supreme text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-50/80 dark:from-black/55 dark:via-black/15 dark:to-black pointer-events-none transition-colors duration-500" />
        <div className="absolute bottom-0 left-0 right-0 h-[350px] bg-gradient-to-t from-slate-50 via-slate-50/80 to-transparent dark:from-black dark:via-black/90 dark:to-transparent pointer-events-none transition-colors duration-500" />
      </div>

      {/* Main Single-Viewport Stage: Header, Hero & Vesper Stats */}
      <div className="page relative z-10 grid grid-rows-[auto_1fr_auto] min-h-screen min-h-[100dvh]">
        <VesperHeader onOpenCommandPalette={() => setCommandPaletteOpen(true)} />
        <Hero onOpenCommandPalette={() => setCommandPaletteOpen(true)} />
        <VesperStats />
      </div>

      {/* Interactive System Architecture Visualizer */}
      <ArchitectureVisualizer />

      {/* Live Interactive Engineering Playgrounds (POS, GDS, AI Agents) */}
      <InteractivePlaygrounds />

      {/* Selected Production Systems (Projects) */}
      <Projects />

      {/* Technical Capabilities & Stack (Bento Grid) */}
      <Skills />

      {/* Engineering Track Record (Timeline) */}
      <Experience />

      {/* Direct Strategic Contact & Quick Message Dispatch */}
      <Contact />

      {/* Modern High-Tech Footer */}
      <Footer />

      {/* Keyboard Quick Command Palette (Ctrl+K) */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
      />
    </>
  );
}
