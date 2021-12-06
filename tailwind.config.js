const { transform } = require("typescript");

module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
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
