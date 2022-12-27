/** @type {import('tailwindcss').Config} */

module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        smilingRed: '#f43a7d',
        smilingGray: '#7f8fa4',
        smilingWhite: '#f5f5f5',
        smilingSuccess: '#45B854',
        smilingYellow: '#e2e21d',
        smilingError: '#e53935',
        smilingBlack: '#1b232f',
        smilingBackgroundDarkMode: '#222c3c',
        smilingElementBackgroundDarkMode: '#1b232f',
        smilingElementContrastDarkMode: '#fdf9f9',
        smilingOrange: '#ff3b3b',
        smilingGrayWeak: 'rgb(194, 202, 212)',
        smilingTextboxShadow: 'rgba(0, 0, 0, 0.25)',
        smilingGroupButtonColor: '#c2cad4',
        smilingFocus: '#ebd7f8',
      },
    },
  },
  plugins: [],
}
