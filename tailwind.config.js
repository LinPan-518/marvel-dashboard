/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#767171",
          DEFAULT: "#10B981",
          dark: "#151515",
        },
        secondary: {
          light: "#FBCFE8",
          DEFAULT: "#EC4899",
          dark: "#BE185D",
        },
        background: "#151515",
        black:{
          light:"#202020",
          default:"#151515",
        }
      },
      keyframes: {
        skeletonWave: {
          '0%': { backgroundPosition: '-200px 0' },
          '100%': { backgroundPosition: '200px 0' },
        },
      },
      animation: {
        skeletonWave: 'skeletonWave 1.5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
