/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        cinzel: ['Cinzel', 'serif'],
        cormorant: ['Cormorant Garamond', 'serif'],
        inter: ['Inter', 'sans-serif'],
      },
      colors: {
        void: '#080b14',
        abyss: '#0a0e1a',
        midnight: '#0f1623',
        slate: '#1e2a3a',
        gold: {
          DEFAULT: '#c9a84c',
          light: '#e0c06a',
          dark: '#a0803a',
        },
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #c9a84c, #e0c06a, #a0803a)',
        'void-gradient': 'linear-gradient(180deg, #080b14 0%, #0f1623 100%)',
      },
      keyframes: {
        shimmer: {
          '0%, 100%': { opacity: 0.4 },
          '50%': { opacity: 1 },
        },
        pulse_slow: {
          '0%, 100%': { transform: 'scale(1)', opacity: 0.8 },
          '50%': { transform: 'scale(1.05)', opacity: 1 },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        dots: {
          '0%, 80%, 100%': { transform: 'scale(0)', opacity: 0 },
          '40%': { transform: 'scale(1)', opacity: 1 },
        },
      },
      animation: {
        shimmer: 'shimmer 3s ease-in-out infinite',
        pulse_slow: 'pulse_slow 4s ease-in-out infinite',
        float: 'float 6s ease-in-out infinite',
        'dot-1': 'dots 1.4s ease-in-out infinite',
        'dot-2': 'dots 1.4s ease-in-out 0.2s infinite',
        'dot-3': 'dots 1.4s ease-in-out 0.4s infinite',
      },
    },
  },
  plugins: [],
}
