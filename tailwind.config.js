/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/component/*.{js,ts,tsx}',
    './src/app/**/*.{js,jsx,ts,tsx}',
    './src/**/*.{js,jsx,ts,tsx}',
  ],

  presets: [require('nativewind/preset')],
  theme: {
    extend: {},
  },
  plugins: [],
}
