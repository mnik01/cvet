/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'ui-green': '#9DE257',
        'ui-red': '#FE5924',
        'ui-orange': {
          main: '#FED260',
          mute: '#FBE3A8',
        },
        'ui-gray-light': '#C2C2C2',
        'ui-gray': '#6B6B6D',
        'ui-black': '#2D2B2B',
        'ui-pre-white': '#FBFBFB',
        'ui-white': '#FFFFFF',
        'ui-blue': '#266CBE',
      },
      fontFamily: {
        sans: ['Nunito', 'Graphik', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
