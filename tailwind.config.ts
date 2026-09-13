import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#000000",
        surface: "#0d0d0d",
        surface2: "#141414",
        line: "rgba(255, 255, 255, 0.14)",
        paper: "#ffffff",
        muted: "#9a9a9a",
        stat: "#d8d8d8",
        phosphor: "#6EE7A8",
        amber: "#E8A33D",
      },
      fontFamily: {
        inter: ["Inter", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
        serif: ['"Instrument Serif"', "Times New Roman", "Times", "serif"],
        mono: [
          "ui-monospace",
          "SFMono-Regular",
          "SF Mono",
          "JetBrains Mono",
          "Menlo",
          "Consolas",
          "monospace",
        ],
        sans: [
          "Inter",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "sans-serif",
        ],
      },
      backgroundImage: {
        scan: "repeating-linear-gradient(0deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 1px, transparent 1px, transparent 3px)",
      },
    },
  },
  plugins: [],
};
export default config;
