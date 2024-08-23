/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1A2902",
        green: "#344C11",
        paleGreen: "#778D45",
        greyGreen: "#AEC09A",
        white: "#FFFFFF",
        secondary: "#8AB446",
        darkOliverGreen: "#556b2f",
        oliveGreen: "#50731b",
        olive: "#3c4c24",
        darkerGreen: "#4b633e",
      },
    },
  },
  plugins: [],
};
