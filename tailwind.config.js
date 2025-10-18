/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
        sutonny: ["SutonnyMJ", "sans-serif"],
         times: ['"Times New Roman"', 'Times', 'serif'],
      },
      fontSize: {
        'sutonny-11': '11px',
        'sutonny-13': '16px',
        'sutonny-16': '24px',
      },
    },
  },
  plugins: [],
}
