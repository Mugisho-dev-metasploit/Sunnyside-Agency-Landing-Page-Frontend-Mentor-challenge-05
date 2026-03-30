/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html"],
  theme: {
    extend: {
      colors: {
        // Primary
        red: {
          400: 'hsl(7, 99%, 70%)',
        },
        yellow: {
          500: 'hsl(51, 100%, 49%)',
        },
        'green-dark': {
          800: 'hsl(167, 40%, 24%)',
        },
        'blue-dark': {
          800: 'hsl(198, 62%, 26%)',
        },
        'green-medium': {
          500: 'hsl(167, 34%, 41%)',
        },
        // Neutral
        'grey-dark': {
          950: 'hsl(212, 27%, 19%)',
        },
        'grey-semi': {
          600: 'hsl(213, 9%, 39%)',
          550: 'hsl(232, 10%, 55%)',
          400: 'hsl(210, 4%, 67%)',
        },
        white: 'hsl(0, 100%, 100%)',
      },
      fontFamily: {
        barlow: ['Barlow', 'sans-serif'],
        fraunces: ['Fraunces', 'serif'],
      },
      fontSize: {
        body: '18px',
      },
    },
  },
  plugins: [],
}