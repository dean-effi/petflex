/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "card-gray": "#E1E0DB",
      },
    },
  },
  plugins: [],
  safelist: [".active"],
};
