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
        "px-bg": "#C3A8D4",
        "px-dark": "#0F0F0F",
        "px-dark2": "#1E1E1E",
        "px-dark3": "#2A2A2A",
        "px-pink": "#E84DC0",
        "px-pink-light": "#F080D8",
        "px-purple": "#7B52CC",
        "px-purple-mid": "#CC44A8",
        "px-blue": "#4A6AE8",
        "px-green": "#44CC88",
        "px-yellow": "#FFDD44",
        "px-red": "#FF4444",
      },
      fontFamily: {
        pixel: ['"Press Start 2P"', "monospace"],
      },
      boxShadow: {
        pixel: "3px 3px 0px #0F0F0F",
        "pixel-sm": "2px 2px 0px #0F0F0F",
        "pixel-inset": "inset 2px 2px 0px rgba(255,255,255,0.1)",
      },
    },
  },
  plugins: [],
};

export default config;
