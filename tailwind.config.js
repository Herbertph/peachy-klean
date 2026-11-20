/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        peach: '#F97316',
        'peach-dark': '#EA580C',
        // AA-compliant shade for white text on orange and orange text on white (FR-23)
        'peach-text': '#C2410C',
        navy: '#0F172A',
        'slate-body': '#475569',
        cream: '#FFFBF7',
        'slate-light': '#F8FAFC',
        line: '#E2E8F0',
        rating: '#FACC15',
      },
      fontFamily: {
        heading: ['"Plus Jakarta Sans"', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
