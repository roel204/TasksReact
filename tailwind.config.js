const defaultConfig = require('tailwindcss/defaultConfig');

module.exports = {
  ...defaultConfig,
  content: [
      './src/**/*.{js,jsx,ts,tsx}',
      './src/index.css'
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};