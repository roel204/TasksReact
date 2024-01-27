const defaultConfig = require('tailwindcss/defaultConfig');

module.exports = {
  ...defaultConfig,
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
};