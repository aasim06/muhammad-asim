"use client";

// High-Fidelity Web Audio API Sound Engine
// Zero external MP3/WAV dependencies; ultra-low latency (<1ms) audio synthesis.

let globalAudioCtx: AudioContext | null = null;
let soundMuted = false;

function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  try {
    if (!globalAudioCtx) {
      const AudioCtxClass =
        window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtxClass) {
        globalAudioCtx = new AudioCtxClass();
      }
    }
    // Browsers suspend audio until first user gesture. Auto-resume whenever triggered by a click!
    if (globalAudioCtx && globalAudioCtx.state === "suspended") {
      globalAudioCtx.resume().catch(() => {});
    }
    return globalAudioCtx;
  } catch {
    return null;
  }
}

export function isAudioMuted(): boolean {
  return soundMuted;
}

export function setAudioMuted(muted: boolean) {
  soundMuted = muted;
}

export function toggleAudioMuted(): boolean {
  soundMuted = !soundMuted;
  return soundMuted;
}

/**
 * High-tech tactile click for clicking architecture nodes, pipeline stages, badges, and tags.
 */
export function playNodeSelectSound() {
  if (soundMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const t = ctx.currentTime;

    // Harmonic pulse 1 (crisp attack)
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = "sine";
    osc1.frequency.setValueAtTime(1100, t);
    osc1.frequency.exponentialRampToValueAtTime(480, t + 0.05);

    gain1.gain.setValueAtTime(0.28, t);
    gain1.gain.exponentialRampToValueAtTime(0.001, t + 0.05);

    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(t);
    osc1.stop(t + 0.05);

    // Subtle resonance body
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = "triangle";
    osc2.frequency.setValueAtTime(800, t);
    osc2.frequency.exponentialRampToValueAtTime(240, t + 0.06);

    gain2.gain.setValueAtTime(0.18, t);
    gain2.gain.exponentialRampToValueAtTime(0.001, t + 0.06);

    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(t);
    osc2.stop(t + 0.06);
  } catch {
    // Graceful fallback if audio blocked
  }
}

/**
 * Satisfying mechanical tab / engine switcher sound (e.g. GDS vs POS switch, theme switch).
 */
export function playTabSwitchSound() {
  if (soundMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const t = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "triangle";
    osc.frequency.setValueAtTime(450, t);
    osc.frequency.exponentialRampToValueAtTime(900, t + 0.07);

    gain.gain.setValueAtTime(0.25, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.07);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(t);
    osc.stop(t + 0.07);
  } catch {}
}

/**
 * Quick button / catalog click haptic.
 */
export function playClickSound() {
  if (soundMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const t = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(950, t);
    osc.frequency.exponentialRampToValueAtTime(320, t + 0.04);

    gain.gain.setValueAtTime(0.24, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.04);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(t);
    osc.stop(t + 0.04);
  } catch {}
}

/**
 * 80mm ESC/POS Thermal Receipt Stepper Motor Sound Simulation.
 */
export function playPrinterMotorSound() {
  if (soundMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const t = ctx.currentTime;
    const steps = 8;
    for (let i = 0; i < steps; i++) {
      const stepTime = t + i * 0.035;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(800 + (i % 3) * 200, stepTime);
      osc.frequency.exponentialRampToValueAtTime(350, stepTime + 0.025);

      gain.gain.setValueAtTime(0.16, stepTime);
      gain.gain.exponentialRampToValueAtTime(0.001, stepTime + 0.025);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(stepTime);
      osc.stop(stepTime + 0.025);
    }
  } catch {}
}

/**
 * Two-tone futuristic success completion chime.
 */
export function playSuccessChimeSound() {
  if (soundMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const t = ctx.currentTime;

    // Note 1: E5 (659Hz)
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = "sine";
    osc1.frequency.setValueAtTime(659.25, t);
    gain1.gain.setValueAtTime(0.24, t);
    gain1.gain.exponentialRampToValueAtTime(0.001, t + 0.12);
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(t);
    osc1.stop(t + 0.12);

    // Note 2: B5 (987Hz)
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = "sine";
    osc2.frequency.setValueAtTime(987.77, t + 0.09);
    gain2.gain.setValueAtTime(0.26, t + 0.09);
    gain2.gain.exponentialRampToValueAtTime(0.001, t + 0.28);
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(t + 0.09);
    osc2.stop(t + 0.28);
  } catch {}
}
