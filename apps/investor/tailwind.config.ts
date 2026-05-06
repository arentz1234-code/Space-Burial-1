import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        space: {
          900: "#020617",
          800: "#0f172a",
          700: "#1e293b",
          600: "#334155",
        },
        nebula: {
          400: "#c084fc",
          500: "#a855f7",
          600: "#9333ea",
        },
        stellar: {
          300: "#5eead4",
          400: "#2dd4bf",
          500: "#14b8a6",
        },
        cosmic: {
          gold: "#fb923c",
          coral: "#f97316",
          amber: "#ff6b35",
          white: "#f1f5f9",
        },
        sailfish: {
          teal: "#06b6d4",
          cyan: "#22d3ee",
          electric: "#00d4ff",
        },
      },
      fontFamily: {
        heading: ["Orbitron", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 6s ease-in-out infinite",
        "twinkle": "twinkle 3s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
        twinkle: {
          "0%, 100%": { opacity: "0.2" },
          "50%": { opacity: "1" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "hero-glow": "radial-gradient(ellipse at center, rgba(6,182,212,0.2) 0%, rgba(168,85,247,0.1) 50%, transparent 70%)",
        "sailfish-gradient": "linear-gradient(135deg, #06b6d4 0%, #a855f7 50%, #f97316 100%)",
      },
    },
  },
  plugins: [],
};
export default config;
