import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      // Mapped to the CSS variables in globals.css so utilities follow the light/dark theme.
      colors: {
        bg: "var(--bg)",
        surface: "var(--sf)",
        ink: "var(--tx)",
        muted: "var(--mu)",
        line: "var(--ln)",
        accent: "var(--fill)",
      },
    },
  },
  plugins: [],
} satisfies Config;
