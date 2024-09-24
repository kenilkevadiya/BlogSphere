/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, 
  theme: {
    extend: {
      colors: {
        'navy-blue': '#001f3f',
        'green': '#28a745'
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
