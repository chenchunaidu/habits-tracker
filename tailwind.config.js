/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx,jsx,js}"],
  theme: {
    extend: {
      height: {
        "full-screen": "",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
