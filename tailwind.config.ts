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
          900: "#030014",
          800: "#0a0a2e",
          700: "#12123a",
          600: "#1a1a4e",
        },
        nebula: {
          400: "#7c3aed",
          500: "#6d28d9",
          600: "#5b21b6",
        },
        stellar: {
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
        },
        cosmic: {
          gold: "#f5c542",
          amber: "#ebb175",
          white: "#e8e6f0",
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
        "hero-glow": "radial-gradient(ellipse at center, rgba(124,58,237,0.15) 0%, transparent 70%)",
      },
    },
  },
  plugins: [],
};
export default config;
