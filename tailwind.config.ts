
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          50: "#EDE9FE",
          100: "#DDD6FE",
          200: "#C4B5FD",
          300: "#A78BFA",
          400: "#9333EA",
          500: "#6A5ACD",
          600: "#5B40B8",
          700: "#4C37A3",
          800: "#3D2E8E",
          900: "#2E257A"
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
          50: "#E6FFFA",
          100: "#B2F5EA",
          200: "#81E6D9",
          300: "#4FD1C5",
          400: "#38B2AC",
          500: "#319795",
          600: "#2C7A7B",
          700: "#285E61",
          800: "#234E52",
          900: "#1D4044"
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
          50: "#FFF5F7",
          100: "#FED7E2",
          200: "#FBB6CE",
          300: "#F687B3",
          400: "#ED64A6",
          500: "#D53F8C",
          600: "#B83280",
          700: "#97266D",
          800: "#702459",
          900: "#4A1D4D"
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover, var(--background)))",
          foreground: "hsl(var(--popover-foreground, var(--foreground)))",
        },
        card: {
          DEFAULT: "hsl(var(--card, var(--background)))",
          foreground: "hsl(var(--card-foreground, var(--foreground)))",
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        'large': '1rem',
      },
      boxShadow: {
        'soft': '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
        'elegant': '0 15px 30px -10px rgba(0, 0, 0, 0.15)',
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" }
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.3s ease-out"
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
