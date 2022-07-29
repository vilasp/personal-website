/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{ts,tsx,jsx,js}'],
  theme: {
    extend: {
      colors: {
        primary: '#F5E8C7',
        secondary: '#DEBA9D',
        tertiary: '#9E7777',
        quaternary: '#6F4C5B',
        highlight: '#7EB5A6',
      },
      keyframes: {
        pop: {
          '0%': {transform: 'scale(0)'},
          '100%': {transform: 'scale(1)'},
        },
      },
      animation: {
        pop: 'pop 0.3s linear',
      },
    },
  },
  plugins: [],
}
