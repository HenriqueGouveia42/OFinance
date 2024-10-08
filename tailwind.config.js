/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

export default {
  mode: 'jit',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.{js,ts}",
  ],
  theme: {
    container: {
      center: true,
    },
    extend: {
      fontSize:{
        'xxs': '0.6rem',
      },
      screens:{
        'custom-md' : '64.5rem'
      },
      colors:{
        primary: '#202225',
        secondary: '#5865f2',
        purple:'#800080',
        gray: colors.neutral,
        gray: {
          900: '#202225',
          800: '#2f3136',
          700: '#36393f',
          600: '#4f545c',
          400: '#d4d7dc',
          300: '#e3e5e8',
          200: '#ebedef',
          100: '#f2f3f5',
        },
      },
    },
  },
  plugins: [],
}

