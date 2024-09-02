import type { Config } from "tailwindcss";

const config: {
  plugins: any[];
  theme: {
    extend: {
      fontFamily: { gm: string[] };
      colors: { default: string; "primary-selected": string; primary: string; skyblue: string };
    };
    screens: {
      tablet: { raw: string };
      smartphone: { raw: string };
      desktop: { raw: string };
      wide: { raw: string };
      mobile: { raw: string };
    };
  };
  content: string[];
} = {
  content: ["./(app|components|hooks)/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    screens: {
      smartphone: { raw: "(max-width: 767px)" },
      tablet: { raw: "(min-width: 768px) and (max-width: 1023px)" },
      mobile: { raw: "(max-width: 1023px)" },
      desktop: { raw: "(min-width: 1024px)" },
      wide: { raw: "(min-width: 1921px)" },
    },
    extend: {
      colors: {
        default: "rgba(0,0,0,.85)",
        primary: "rgba(33,150,243,1)",
        "primary-selected": "rgba(33,150,243, 0.08)",
        skyblue: "rgba(66, 165, 245, 1)",
      },
      fontFamily: {
        gm: ["var(--font-gm-serif)"],
      },
    },
  },
  plugins: [require("@savvywombat/tailwindcss-grid-areas")],
};
export default config;
