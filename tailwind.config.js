/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary: "#07332F",
        secondary: "#F7A582",
      }
    },
  },
  plugins: [require("daisyui")],
}

