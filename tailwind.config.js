/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,vue}"],
  theme: {
    extend: {
      backgroundColor: {
        'black-30': 'rgba(0, 0, 0, 0.3)'
      }
    },
  },
  plugins: [],
}