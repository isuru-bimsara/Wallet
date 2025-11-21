/** @type {import('tailwindcss').Config} */
const { COLORS } = require("./src/constants/colors");

module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: COLORS.primary,
        background: COLORS.background,
        text: COLORS.text,
        border: COLORS.border,
        white: COLORS.white,
        textLight: COLORS.textLight,
        expense: COLORS.expense,
        income: COLORS.income,
        card: COLORS.card,
        shadow: COLORS.shadow,
      },
    },
  },
  plugins: [],
};
