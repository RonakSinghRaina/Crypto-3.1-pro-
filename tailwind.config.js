/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#080A06',
        primary: '#C8F400',
        secondary: '#00FF87',
        panel: '#0D110C',
        foreground: '#EEFCE8',
      },
      fontFamily: {
        sans: ['Sora', 'sans-serif'],
        drama: ['"Instrument Serif"', 'serif'],
        mono: ['"Fira Code"', 'monospace'],
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg, #C8F400, #00FF87)',
      },
      keyframes: {
        scroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-33.33%)' }
        }
      },
      animation: {
        'scroll-fast': 'scroll 30s linear infinite',
        'scroll-slow': 'scroll 45s linear infinite reverse',
      }
    },
  },
  plugins: [],
}
