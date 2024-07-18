/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#131417",
        secondary: "#1e1f26",
        primaryText: "#868ca0",
        text555: "#555",
      }
    },
  },
  plugins: [],
}

