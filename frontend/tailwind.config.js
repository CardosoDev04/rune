/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    mode: 'jit',
    purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
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
              darkComponentBg: '#20243B',
              darkPageBg: {
                100: '#262C4D',
                  200: '#1D2135',
                    300: '#191C2A',
                        400: '#212529',
              }
          }
        },
    },
    plugins: [],
}

