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
        // Our Custom Architectural Theme
        forest: "#1a2f24", // Deep rich green
        sage: "#8a9a86",   // Muted green from the logo
        gold: "#d4af37",   // Warm gold/mustard for typography
        cream: "#f5f5f0",  // Soft off-white for reading text
      },
    },
  },
  plugins: [],
};
export default config;