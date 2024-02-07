import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "share-tech-mono": ['"Share Tech Mono"', "monospace"],
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
export default config;
