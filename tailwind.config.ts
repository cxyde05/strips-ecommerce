import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'luxury-black': '#0a0a0a',
        'luxury-white': '#f5f5f2',
        'luxury-silver': '#c9ccd1',
      },
      fontFamily: {
        display: ['Cormorant Garamond', 'serif'],
        sans: ['Jost', 'sans-serif'],
      },
      spacing: {
        gutter: 'clamp(1rem, 5vw, 3rem)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-down': {
          '0%': { opacity: '0', transform: 'translateY(-100%)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.8s ease-out',
        'fade-in': 'fade-in 0.8s ease-out',
        'slide-down': 'slide-down 0.5s ease-out',
      },
    },
  },
  plugins: [],
};

export default config;
