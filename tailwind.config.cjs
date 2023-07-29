/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.html", "./src/**/*.vue"],
  theme: {
    colors: {
      white: "#ffffff",
      rust:'#b7410e', 
      docker: "#0db7ed",
      black: "#000000",
      trasperent: "transparent",
      hyperlink: "#964CF3",
      cyan: "#00FFFF",
    },
    fontFamily: {
      gsans: ["googleSans"],
    },
    fontSize: {
      xs: "0.75rem",
      sm: "0.875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
      "5xl": "3rem",
      "6xl": "3.75rem",
      "7xl": "4.5rem",
      "8xl": "6rem",
      "9xl": "8rem",
      "xxl":  "16rem",
    },

    extend: {},
  },
  plugins: [],
};
