/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./pages/index.js',"./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
}

