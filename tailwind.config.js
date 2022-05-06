/* eslint-disable @typescript-eslint/no-var-requires */
const colors = require('tailwindcss/colors')
const lineClamps = require('@tailwindcss/line-clamp')

module.exports = {
  darkMode: 'class',
  content: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      transparent: 'transparent',
      zinc: colors.zinc,
      yellow: colors.yellow,
      slate: colors.slate,
      neutral: colors.neutral,
      black: colors.black,
      white: colors.white,
      red: '#f2594E',
    },
    fontFamily: {
      base: ['Roboto', 'sans-serif'],
      mono: ['Nova Mono', 'monospace'],
    },
  },
  plugins: [lineClamps],
}
