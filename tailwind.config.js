/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      maxWidth: { site: "1400px" },
      fontFamily: { sans: ["Manrope", "system-ui", "sans-serif"] },
      colors: {
        brand: {
          50: "#eef3ff",
          100: "#dce6fe",
          200: "#c0d1fc",
          300: "#8fabf6",
          400: "#5e85ee",
          500: "#3965e3",
          600: "#1f4fd1",
          700: "#1a41ae",
          800: "#17368a",
          900: "#142c6b",
          950: "#0e1b42",
        },
      },
    },
  },
  plugins: [],
};
