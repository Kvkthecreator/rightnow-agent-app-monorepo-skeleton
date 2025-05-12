import { type Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem"
    },
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"]
      },
      borderRadius: {
        sm: "0.375rem",   // 6px
        md: "0.5rem",     // 8px
        lg: "0.75rem",    // 12px
        xl: "1rem",       // 16px
        "2xl": "1.5rem"   // 24px
      }
    }
  },
  plugins: [require("tailwindcss-animate")]
}

export default config
