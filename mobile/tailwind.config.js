/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1A2902",
        green: "#344C11",
        paleGreen: "#778D45",
        greyGreen: "#AEC09A",
        white: "#FFFFFF",
        secondary: "#8AB446",
      },
      fontFamily: {
        pRegular: ["Itim-Regular", "sans-serif"],
        pJaldi: ["Jaldi-Regular", "sans-serif"],
        pJaldiBold: ["Jaldi-Bold", "sans-serif"],
        pMixed: ["JejuGothic-Regular", "sans-serif"],
      },
    },
  },
  plugins: [],
};
