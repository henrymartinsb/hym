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
        object: [ "-apple-system", "Nunito"],
      },
      colors: {
        "spaced": "#0047ff"
      }
    },
  },
  plugins: [],
};