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
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.pdf-mode': {
          '@apply bg-white max-w-2xl mx-auto text-sm leading-tight': {},
        },
        '.pdf-mode h4': {
          '@apply text-lg font-bold mb-2 mt-2 text-center': {},
        },
        '.pdf-mode .shadow-md, .pdf-mode .shadow-lg': {
          'box-shadow': 'none',
        },
        '.pdf-mode .border-b': {
          'border-color': '#d1d5db', // light gray (gray-300)
        },
        '.pdf-mode .text-gray-500': {
          'color': '#6b7280', // немного темнее gray-500
        },
        '.pdf-mode button': {
          'display': 'none',
        },
      });
    }
  ]
}