import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: '#FAF6F0',
        paper: '#FFFDF8',
        ink: '#3D3A36',
        accent: '#C48B6F',
        accentSoft: '#E8C4B4',
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'PingFang SC',
          'Hiragino Sans GB',
          'Microsoft YaHei',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ],
        serif: ['Georgia', 'Times New Roman', 'Songti SC', 'SimSun', 'serif'],
      },
      boxShadow: {
        card: '0 2px 12px rgba(0, 0, 0, 0.06)',
        cardHover: '0 8px 30px rgba(0, 0, 0, 0.10)',
      },
    },
  },
  plugins: [],
};

export default config;
