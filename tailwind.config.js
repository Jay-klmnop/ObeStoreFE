/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  plugins: [],
  theme: {
    extend: {
      colors: {
        primary: {
          700: 'var(--color-primary-700)',
          '500-60': 'var(--color-primary-500-60)',
          '500-50': 'var(--color-primary-500-50)',
          '500-40': 'var(--color-primary-500-40)',
        },
        'custom-gray': {
          50: '#cdd1d5',
          30: '#b1b8be',
          20: '#CDD1D5',
          10: '#E6E8EA',
        },
      },
    },
  },
};
