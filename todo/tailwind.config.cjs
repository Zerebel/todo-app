/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  content: ["index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ["Montserrat", ...defaultTheme.fontFamily.sans],
        raleway: ["Raleway", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        dark: "#333333",
        gray2: "#A9A9A9",
        gray3: "#828282",
        gray4: "#BDBDBD",
        blue: "#2F80ED",
        Red_Salsa: "#EB5757",
      },
      boxShadow: {
        C_shadow: "0px 2px 6px rgba(127, 177, 243, 0.4)",
      },
    },
  },
  plugins: [],
};
