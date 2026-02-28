cat > tailwind.config.ts <<'EOF'
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      keyframes: {
        floaty: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        scrollDot: {
          "0%": { transform: "translateY(0px)", opacity: "0.2" },
          "30%": { opacity: "1" },
          "70%": { transform: "translateY(10px)", opacity: "0.9" },
          "100%": { transform: "translateY(14px)", opacity: "0.1" },
        },
      },
      animation: {
        floaty: "floaty 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
EOF