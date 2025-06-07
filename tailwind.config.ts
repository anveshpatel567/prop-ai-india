
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
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      fontFamily: {
        'rajdhani': ['Rajdhani', 'sans-serif'],
        'dmsans': ['DM Sans', 'sans-serif'],
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        // Huly-inspired clean design system
        'global-bg': '#F5F7FA',
        'section-light': '#FFFFFF',
        'section-gradient-1': '#E0EAFC',
        'section-gradient-2': '#CFDEF3',
        'section-alt': '#F1F5F9',
        'text-primary': '#1F2937',
        'text-secondary': '#374151',
        'text-muted': '#6B7280',
        'accent-blue': '#3B82F6',
        'accent-cyan': '#06B6D4',
        'accent-sky': '#0EA5E9',
        'accent-violet': '#7C3AED',
        'accent-lime': '#84CC16',
        'accent-green': '#10B981',
        'cta-gradient-start': '#16A085',
        'cta-gradient-end': '#F4D03F',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' }
        },
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        'scale-up': {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' }
        },
        'pulse-border': {
          '0%, 100%': { borderColor: '#06B6D4' },
          '50%': { borderColor: '#3B82F6' }
        },
        'text-glow': {
          '0%, 100%': { textShadow: '0 0 5px rgba(59, 130, 246, 0.3)' },
          '50%': { textShadow: '0 0 15px rgba(59, 130, 246, 0.6)' }
        },
        'ai-scan': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' }
        },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in': 'fade-in 0.6s ease-out',
        'scale-up': 'scale-up 0.4s ease-out',
        'pulse-border': 'pulse-border 2s ease-in-out infinite',
        'text-glow': 'text-glow 2s ease-in-out infinite',
        'ai-scan': 'ai-scan 2s ease-in-out infinite',
        'float-slow': 'float-slow 3s ease-in-out infinite'
      },
      boxShadow: {
        'soft': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'card': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'glow-blue': '0 0 20px rgba(59, 130, 246, 0.4)',
        'glow-cyan': '0 0 20px rgba(6, 182, 212, 0.4)',
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
