import { type Config } from "tailwindcss"
import colors from "tailwindcss/colors"

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
      colors: {
        background: colors.stone[50],
        foreground: colors.stone[900],
        muted: colors.stone[100],
        border: colors.stone[200],
        input: colors.stone[100],
        ring: colors.stone[300],
        primary: colors.stone[700],
        "primary-foreground": colors.stone[50],
        secondary: colors.stone[300],
        "secondary-foreground": colors.stone[900]
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"]
      },
      borderRadius: {
        sm: "0.375rem",
        md: "0.5rem",
        lg: "0.75rem",
        xl: "1rem",
        "2xl": "1.5rem"
      }
    }
  },
  plugins: [require("tailwindcss-animate")]
}

export default config
