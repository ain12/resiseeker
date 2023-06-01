/** @type {import('tailwindcss').Config} */

const colors = require("tailwindcss/colors");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    colors: {
      orange: "#F9943B",
      lightgrey: "#E0E0E2",
      brown: "#A0815C",
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      neutral: colors.neutral,
      transparent: "transparent",
      current: "currentColor",
      indigo: colors.indigo,
      yellow: colors.yellow,
      emerald: colors.emerald,
      rose: colors.rose,
    },
  },
  plugins: [],
};
