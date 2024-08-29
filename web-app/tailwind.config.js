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
        darkGreen: "#3c531a",
        darkerGreen: "#4b633e",
        mintGreen: "#c6e2d4",
        mutedGreen: "#aec09a",
        paleDarkGreen: "#536934",
        darkOliverGreen: "#556b2f",
        oliveGreen: "#50731b",
        olive: "#3c4c24",
        darkerGreen: "#4b633e",
        lightbeige: "#6b7a54",
        lighterMute: "#d0d8c4 ",
      },
      backgroundImage: {
        greenGradient: "linear-gradient(to bottom, #344C11, #aec09a)",
      },
    },
  },
  plugins: [],
};
