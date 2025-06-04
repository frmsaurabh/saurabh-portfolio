/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      colors: {
        primary: "#0a192f",
        accent: "#64ffda",
        light: "#ccd6f6",
        dark: "#8892b0",
      },
    },
  },
  plugins: [],
};
