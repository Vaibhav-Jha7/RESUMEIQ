/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#121826",
          soft: "#1E2740",
          muted: "#2A3350",
        },
        paper: {
          DEFAULT: "#F7F6F1",
          card: "#FFFFFF",
          line: "#E2DFD4",
        },
        scan: {
          DEFAULT: "#2AA37B",
          light: "#E4F3EC",
          dark: "#1D7A5B",
        },
        flag: {
          DEFAULT: "#D98E2B",
          light: "#FAEFDD",
        },
        alert: {
          DEFAULT: "#C4453D",
          light: "#F8E4E2",
        },
        ink900: "#171B26",
        muted: "#6B7280",
      },
      fontFamily: {
        display: ["Fraunces", "serif"],
        body: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      keyframes: {
        scanline: {
          "0%": { transform: "translateY(0%)" },
          "100%": { transform: "translateY(2000%)" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(6px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        scanline: "scanline 2.4s linear infinite",
        fadeUp: "fadeUp 0.35s ease-out both",
      },
    },
  },
  plugins: [],
};
