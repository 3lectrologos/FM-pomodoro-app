import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      primary_red: '#F87070',
      primary_cyan: '#70F3F8',
      primary_purple: '#D881F8',
      lightblue: '#D7E0FF',
      background: '#1E213F',
      white: '#FFFFFF',
      offwhite: '#EFF1FA',
      offblack: '#161932'
    },
    screens: {
      tablet: '640px',
      desktop: '1280px'
    },
    backgroundImage: {
      'oval': 'linear-gradient(315deg, #2E325A 0%, #0E112A 100%)'
    },
    boxShadow: {
      'oval': '50px 50px 100px 0px #121530, -50px -50px 100px 0px #272C5A'
    }
  },
  plugins: [],
}
export default config
