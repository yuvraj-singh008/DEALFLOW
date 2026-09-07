/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      animation: {
        'swipe-left': 'swipeLeft 0.5s ease-out',
        'swipe-right': 'swipeRight 0.5s ease-out',
        'swipe-up': 'swipeUp 0.5s ease-out',
      },
      keyframes: {
        swipeLeft: {
          '0%': { transform: 'translateX(0) rotate(0deg)' },
          '100%': { transform: 'translateX(-120%) rotate(-20deg)' },
        },
        swipeRight: {
          '0%': { transform: 'translateX(0) rotate(0deg)' },
          '100%': { transform: 'translateX(120%) rotate(20deg)' },
        },
        swipeUp: {
          '0%': { transform: 'translateY(0) scale(1)' },
          '100%': { transform: 'translateY(-120%) scale(0.95)' },
        },
      },
    },
  },
  plugins: [],
}
