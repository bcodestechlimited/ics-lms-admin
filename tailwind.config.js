/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        main: "#0B2239",
        plain: "#404757",
        skyblue: "#0269D0",
        secondary: "#013467",
        primary: "#F4F5F5",
        myblue: "#0592F6",
        grey: "#758E95",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
