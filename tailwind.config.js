/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "white": "#FEFEFE",
        "violet": "#6E668F",
        "pink": "#64346F",
        "blue": "#012768"
      },
    },
  },
  plugins: [],
}