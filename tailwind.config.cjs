/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  darkMode: 'class', // https://tailwindcss.com/docs/dark-mode#toggling-dark-mode-manually
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: { // https://tailwindcss.com/docs/adding-custom-styles
    extend: {
      fontFamily: {
        /* import custom fonts in index.css */
        'sans': ['Inter', ...defaultTheme.fontFamily.sans],
      },
    }
  },
  plugins: [],
};