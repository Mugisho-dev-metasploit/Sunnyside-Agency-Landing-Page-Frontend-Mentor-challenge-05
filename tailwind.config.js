/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html", "./src/**/*.js"],
  theme: {
    extend: {
      colors: {
        // Primary
        'soft-red': 'hsl(7, 99%, 70%)',
        yellow: 'hsl(51, 100%, 49%)',
        'dark-desaturated-cyan': 'hsl(167, 40%, 24%)',
        'dark-blue': 'hsl(198, 62%, 26%)',
        'dark-moderate-cyan': 'hsl(168, 34%, 41%)',
        // Neutral
        'very-dark-desaturated-blue': 'hsl(212, 27%, 19%)',
        'very-dark-grayish-blue': 'hsl(213, 9%, 39%)',
        'dark-grayish-blue': 'hsl(232, 10%, 55%)',
        'grayish-blue': 'hsl(210, 4%, 67%)',
        white: 'hsl(0, 100%, 100%)',
      },
      fontFamily: {
        barlow: ['Barlow', 'sans-serif'],
        fraunces: ['Fraunces', 'serif'],
      },
      fontSize: {
        body: '18px',
      },
      animation: {
        'bounce-down': 'bounce-down 2s infinite',
        'fade-in-up': 'fade-in-up 0.8s ease-out forwards',
        'fade-in-down': 'fade-in-down 0.8s ease-out forwards',
        'scale-in': 'scale-in 0.6s ease-out',
        'slide-up': 'slide-up 0.3s ease',
      },
      keyframes: {
        'bounce-down': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'fade-in-up': {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in-down': {
          from: { opacity: '0', transform: 'translateY(-30px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'scale-in': {
          from: { opacity: '0', transform: 'scale(0.95)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
        'slide-up': {
          from: { transform: 'translateY(10px)' },
          to: { transform: 'translateY(0)' },
        },
      },
      boxShadow: {
        'soft': '0 4px 12px rgba(0, 0, 0, 0.08)',
        'medium': '0 8px 24px rgba(0, 0, 0, 0.12)',
        'large': '0 12px 32px rgba(0, 0, 0, 0.15)',
      },
    },
  },
  plugins: [],
}