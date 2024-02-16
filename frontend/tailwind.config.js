/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "dark-purple": "#081A51",
        "light-white": "rgba(255,255,255,0.17)"
      },
      width: {
        'calc-(100%-288px)': 'calc(100% - 288px)',
        'calc-(100%-80px)': 'calc(100% - 80px)',
      },
    },
  },
  plugins: [],
}
