import type { Config } from 'tailwindcss';

import { palette } from '@botspot/ui';

const config: Config = {
  plugins: [],
  content: [
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  safelist: [
    'object-cover',
    'object-contain',
    'z-[1201]',
    '!hidden',
    'md:!block',
    'flex-1',
  ],
  theme: {
    extend: {
      colors: palette,
    },
  },
};

export default config;
