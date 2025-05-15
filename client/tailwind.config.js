/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'montserrat': ['Montserrat', 'sans-serif'],
        'mono': ['Roboto Mono', 'monospace'],
        'inter': ['Inter', 'sans-serif'],
      },
      borderColor: {
        border: 'hsl(var(--border))',
      },
      colors: {
        border: 'hsl(var(--border))',
      },
    },
  },
  plugins: [],
} 