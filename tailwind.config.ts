
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
        'inter': ['Inter', 'sans-serif'],
        'orbitron': ['Orbitron', 'monospace'],
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
        // New futuristic color scheme
        hero: {
          from: '#0f2027',
          via: '#203a43',
          to: '#2c5364',
        },
        ai: {
          purple: '#8A2387',
          coral: '#E94057', 
          orange: '#F27121',
        },
        neon: {
          cyan: '#00FFFF',
          lime: '#A6FF00',
          blue: '#00d4ff',
          purple: '#090979',
        },
        glass: {
          white: 'hsl(var(--glass-white))',
          border: 'hsl(var(--glass-border))',
        }
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
          '0%, 100%': { borderColor: '#00FFFF' },
          '50%': { borderColor: '#A6FF00' }
        },
        'radial-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(138, 35, 135, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(233, 64, 87, 0.6), 0 0 60px rgba(242, 113, 33, 0.4)' }
        },
        'ai-scan': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in': 'fade-in 0.6s ease-out',
        'scale-up': 'scale-up 0.4s ease-out',
        'pulse-border': 'pulse-border 2s ease-in-out infinite',
        'radial-glow': 'radial-glow 3s ease-in-out infinite',
        'ai-scan': 'ai-scan 2s ease-in-out infinite'
      },
      dropShadow: {
        'neon': '0 0 10px #00FFFF',
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
