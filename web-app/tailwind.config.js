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
      },
    },
  },
  plugins: [],
};
