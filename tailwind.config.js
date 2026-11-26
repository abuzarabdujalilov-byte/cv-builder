/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "var(--primary)",
          hover: "#4F46E5",
          2: "var(--primary-2)",
        },
        accent: {
          DEFAULT: "var(--accent)",
        },
        ink: {
          DEFAULT: "var(--ink)",
          muted: "var(--ink-muted)",
        },
        success: "#16A34A",
        warning: "#F59E0B",
        danger: "#E11D48",
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        serif: ['"Source Serif 4"', 'Georgia', 'serif'],
      },
      borderRadius: {
        card: "24px",
        sheet: "32px",
      },
      boxShadow: {
        'glass-1': '0 8px 32px rgba(99, 102, 241, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
        'glass-2': '0 16px 48px rgba(15, 23, 42, 0.14), inset 0 1px 0 #fff',
        'glass-glow': '0 8px 24px rgba(99, 102, 241, 0.35)',
      },
      animation: {
        'sparkle': 'sparkle 4s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s infinite linear',
        'float-slow': 'float 24s ease-in-out infinite alternate',
      },
      keyframes: {
        sparkle: {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.15)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        float: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '100%': { transform: 'translate(40px, -30px) scale(1.1)' },
        }
      }
    },
  },
  plugins: [],
}
