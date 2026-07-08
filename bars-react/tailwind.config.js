/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: '#0b0c0f',
        'ink-2': '#141620',
        paper: '#ede9df',
        white: '#f6f4ee',
        rust: '#c8362a',
        'rust-2': '#a82c22',
        slate: '#3c4550',
        gold: '#c9a05c',
      },
      fontFamily: {
        'display': ['Big Shoulders Display', 'sans-serif'],
        'mono': ['IBM Plex Mono', 'monospace'],
        'sans': ['Inter', 'sans-serif'],
      },
      maxWidth: {
        'max': '1240px',
      },
      spacing: {
        'line': 'rgba(246, 244, 238, 0.12)',
      },
      screens: {
        'sm': { 'max': '640px' },
        'md': { 'max': '960px' },
        'lg': { 'max': '1024px' },
      },
    },
  },
  plugins: [],
}
