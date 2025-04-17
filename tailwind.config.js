/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        'xxs': '0.625rem'
      },
      screens: {
        xs: '480px',
      },
      animation: {
        'fade-slide': 'fadeSlideIn 0.2s ease-out',
      },
      keyframes: {
        fadeSlideIn: {
          '0%': { opacity: 0, transform: 'translateY(-4px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}