const { transform } = require("typescript");

module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors:{
        gray:{
          1000: '#AEB1BD',
          1001: '#939097',
        },
        orange:{
          1000: '#FFDC86'
        },
        green: {
          1000: '#7FD1AE'
        },
        blue: {
          1000: '#B7D3F4'
        },
        red: {
          1000: '#FFC9AE'
        },
        yellow: {
          1000: '#FFEECA'
        },
      },
      keyframes: {
        pingone: {
          '0%': {
            transform: 'translate(-50%, -50%)',
            opacity: '0'
          },
          '75% , 100%': {
            opacity: '1',
          }
        },
        remove: {
          from: {
            opacity: 1,
            display: 'block',
          },
          to: {
            opacity: 0,
            transform: 'scale(0)',
            display: 'none'
          }
        },
        loading: {
          to: {
              transform: 'rotate(1turn)'
          }
        }
      }
    ,
      animation: {
        pingone: 'pingone 0.25s ease-in 1',
        remove: 'remove 1s ease-in 1',
        spin: 'spin 5s linear infinite;', 
        loading: 'loading 2s linear infinite'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
