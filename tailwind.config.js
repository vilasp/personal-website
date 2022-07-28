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
    },
  },
  plugins: [],
}
