/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "dungeon": "url('images/backgrounds/background-dungeon.jpg')",
        "market": "url('images/backgrounds/background-market-2.jpg')",
        "castle": "url('images/backgrounds/background-castle.webp')",
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
        },
        "vermelho": {
          300: "#ec9a9a",
          500: "#BD1919"
        },
        "verde": {
          200: '#29BCBA',
          300: "#1C7585",
          600: "#525658"
        },
        "azul": {
          200: "#6E90E3",
          400: "#1746BA",
          600: "#013C73"
        }
      }
    },
  },
  plugins: [],
}

