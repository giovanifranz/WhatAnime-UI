/* eslint-disable @typescript-eslint/no-var-requires */
const colors = require('tailwindcss/colors')
const lineClamps = require('@tailwindcss/line-clamp')

module.exports = {
  content: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      zinc: colors.zinc,
      yellow: colors.yellow,
      slate: colors.slate,
      neutral: colors.neutral[800],
      black: colors.black,
      white: colors.white,
    },
    fontFamily: {
      base: ['Roboto', 'sans-serif'],
      mono: ['Nova Mono', 'monospace'],
    },
  },
  plugins: [lineClamps],
}
