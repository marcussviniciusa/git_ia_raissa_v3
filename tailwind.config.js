/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: '#0a0a0a',
          secondary: '#1a1a1a'
        },
        foreground: {
          DEFAULT: '#ffffff',
          secondary: '#a3a3a3'
        },
        border: {
          DEFAULT: '#262626'
        },
        primary: {
          DEFAULT: '#3b82f6',
          hover: '#2563eb'
        }
      }
    },
  },
  plugins: [],
};