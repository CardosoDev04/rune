/** @type {import('tailwindcss').Config} */
const {nextui} = require("@nextui-org/react");
module.exports = {
    darkMode: 'class',
    mode: 'jit',
    purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
        "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {

        fontFamily:{
            inter: ['Inter', 'sans-serif']
        },
        extend: {

            gradientColors: {
                'blue-gradient': ['#4135FF', '#3014FF', '#4135FF', '#4585FF'],
                'dark-gradient': ['#262C4D', '#1D2135', '#191C2A', '#212529'],
            },

          colors: {
            runeBlue: {
              100: '#4585FF',
              200: '#4135FF',
              500: '#3014FF',
              600: '#1E00FF',
                700: '#130298',
            },
              footerDark: 'rgba(255,255,255,0.5)',
              footerLight:'rgba(79,79,79,0.5)',
              inputLabelColorDark: '#bdc4ec',
              placeHolderLight: '#BCBCBC',
              placeHolderDark: 'rgba(255,250,250,0.4)',
              darkComponentBg: {
                400: '#3f4672',
                500: '#343a5f',
                600: '#2A2F4D',
                  700: '#282f45',
                  800 : '#20243B',
                  900: '#101010'
              } ,
              darkPageBg: {
                100: '#262C4D',
                  200: '#1D2135',
                    300: '#191C2A',
                        400: '#212529',
              }
          }
        },
    },
    plugins: [
        nextui()
    ],
}

