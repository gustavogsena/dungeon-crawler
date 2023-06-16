/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "dungeon": "url('images/backgrounds/background-dungeon.jpg')"
      },
      fontFamily: {
        "gotika": ['gotika'],
        "deutsh": ['deutsch']
      },
      colors: {
        'amarelo': {
          200: "#dddcb6",
          700: "#8a883f"
        },
        "cinza": {
          100: "#FFFDFD",
          400: "#F9F9F9",
          500: "#EEECEC",
          600: "#DFDFDD",
        }
      }
    },
  },
  plugins: [],
}

