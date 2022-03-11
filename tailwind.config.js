const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      emerald: colors.emerald,
      indigo: colors.indigo,
      yellow: colors.yellow,
      purple: "#3f3cbb",
      midnight: "#121063",
      metal: "#565584",
      tahiti: "#3ab7bf",
      silver: "#ecebff",
      "bubble-gum": "#ff77e9",
      bermuda: "#78dcca",
      "mb-black": {
        100: "#17152D",
        200: "#232139",
      },
      "mb-purple": "#4F3CC8",
      "mb-green": "#00ED85",
      "mb-offWhite": "#F9F9FE",
      "mb-gray": "#5E5A5A",
    },
    fontFamily: {
      sans: ["Roboto", "sans-serif"],
    },
    container: {
      center: true,
      padding: "2rem",
    },
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],
};
