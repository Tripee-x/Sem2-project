/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1E1E2F',
        accent: '#FF5252',
        secondary: '#4CAF50',
        'dark-bg': '#161625',
        'card-bg': '#252538',
        'text-primary': '#FFFFFF',
        'text-secondary': '#DADADA',
        'text-muted': '#A0A0B0',
        'border-color': '#393950',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'luxury': '0 10px 30px rgba(0, 0, 0, 0.3)',
        'card': '0 4px 20px rgba(0, 0, 0, 0.2)',
        'glow': '0 0 20px rgba(255, 82, 82, 0.3)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(255, 82, 82, 0.2)' },
          '100%': { boxShadow: '0 0 20px rgba(255, 82, 82, 0.4)' },
        },
      },
    },
  },
  plugins: [],
}