import type { Config } from 'tailwindcss';

const px0_10: { [key: number]: string } = { ...Array.from(Array(11)).map((_, i) => `${i}px`) };
const px0_100: { [key: number]: string } = { ...Array.from(Array(101)).map((_, i) => `${i}px`) };
const px0_200: { [key: number]: string } = { ...Array.from(Array(201)).map((_, i) => `${i}px`) };

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontFamily: {
      sans: ['Pretendard', 'system-ui', 'sans-serif'],
    },
    fontWeight: {
      thin: '100',
      extralight: '200',
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
      black: '900',
    },
    extend: {
      backgroundImage: {},
      colors: {
        bible: '#2AC1BC',
        img: '#FFC8A2',
        main: '#3182f6',
      },
      borderWidth: px0_10,
      fontSize: px0_100,
      lineHeight: px0_100,
      minWidth: px0_200,
      minHeight: px0_200,
      spacing: px0_200,
    },
  },
  plugins: [],
};
export default config;
