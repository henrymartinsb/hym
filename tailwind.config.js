/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: "Poppins",
        object: "Object Sans",
      },
      colors: {
        "spaced": "#0047ff"
      }
    },
  },
  plugins: [],
};