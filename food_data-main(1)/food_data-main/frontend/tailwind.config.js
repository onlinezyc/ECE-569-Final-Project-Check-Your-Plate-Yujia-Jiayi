import daisyui from 'daisyui'
const theme = {}

export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: theme,
  },
  darkMode: 'class',
  plugins: [daisyui],
}
