/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Instrument Sans", "sans-serif"], // Default font
        inter: ["Inter", "sans-serif"], // Use with font-inter
        zen: ["Zen Dots", "cursive"], // Use with font-zen
      },
    },
  },
  plugins: [],
};
