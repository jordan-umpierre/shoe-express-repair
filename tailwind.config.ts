import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#F7F2EA',
        parchment: '#FBF7F0',
        warmgray: {
          50: '#F6F3EE',
          100: '#EFEAE2',
          200: '#D8D1C5',
          300: '#B5AC9D',
          400: '#948A7A',
          500: '#7A7468',
          600: '#5C5749',
          700: '#4A463E',
          800: '#2E2B26',
          900: '#1F1B17',
        },
        tan: {
          DEFAULT: '#C9A87C',
          dark: '#A8865A',
        },
        ink: '#0E0C0A',
        charcoal: '#1F1B17',
        burgundy: {
          DEFAULT: '#7A1F1F',
          50: '#F6E6E6',
          100: '#E9C4C4',
          500: '#9A2A2A',
          600: '#7A1F1F',
          700: '#621818',
          800: '#4A1212',
        },
      },
      fontFamily: {
        display: ['"Fraunces"', 'Georgia', 'Cambria', 'serif'],
        sans: ['"Inter"', ...defaultTheme.fontFamily.sans],
      },
      letterSpacing: {
        tightish: '-0.015em',
      },
      boxShadow: {
        soft: '0 1px 2px rgba(15, 12, 10, 0.04), 0 8px 24px rgba(15, 12, 10, 0.06)',
        card: '0 1px 2px rgba(15, 12, 10, 0.05), 0 12px 36px rgba(15, 12, 10, 0.08)',
        deep: '0 24px 60px rgba(15, 12, 10, 0.18)',
      },
      borderRadius: {
        card: '14px',
      },
      maxWidth: {
        prose: '68ch',
      },
      transitionTimingFunction: {
        gentle: 'cubic-bezier(0.22, 0.61, 0.36, 1)',
      },
    },
  },
  plugins: [],
};

export default config;
