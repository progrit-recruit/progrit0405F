/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        coral: '#F96167',
        navy: '#1A1F3A',
        gold: '#F9E795',
        cream: '#FFFDF0',
      },
      keyframes: {
        'fade-in': { from: { opacity: '0' }, to: { opacity: '1' } },
        'slide-in-from-bottom-4': { from: { transform: 'translateY(1rem)', opacity: '0' }, to: { transform: 'translateY(0)', opacity: '1' } },
        'slide-in-from-right-4': { from: { transform: 'translateX(1rem)', opacity: '0' }, to: { transform: 'translateX(0)', opacity: '1' } },
        'slide-in-from-left': { from: { transform: 'translateX(-1rem)', opacity: '0' }, to: { transform: 'translateX(0)', opacity: '1' } },
        'slide-in-from-top-2': { from: { transform: 'translateY(-0.5rem)', opacity: '0' }, to: { transform: 'translateY(0)', opacity: '1' } },
        'slide-in-from-bottom-10': { from: { transform: 'translateY(2.5rem)', opacity: '0' }, to: { transform: 'translateY(0)', opacity: '1' } },
        'zoom-in': { from: { transform: 'scale(0.9)', opacity: '0' }, to: { transform: 'scale(1)', opacity: '1' } },
      },
      animation: {
        'fade-in': 'fade-in 0.5s ease-out',
        'slide-up': 'slide-in-from-bottom-4 0.5s ease-out',
        'slide-right': 'slide-in-from-right-4 0.3s ease-out',
        'slide-left': 'slide-in-from-left 0.5s ease-out',
        'slide-down': 'slide-in-from-top-2 0.3s ease-out',
        'slide-up-lg': 'slide-in-from-bottom-10 0.4s ease-out',
        'zoom-in': 'zoom-in 0.3s ease-out',
      },
    },
  },
  plugins: [],
}
