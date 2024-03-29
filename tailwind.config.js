/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": {},
        "secondary": {},
        "error-dark": {},
        "error-light": {},
        "success": "green",
        "success-light": {},
        "react-blue": "#61DBFB"
      }
    },
  },
  plugins: [],
}