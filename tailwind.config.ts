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
    'xl:!block',
    'items-center',
    'flex-1',
    '!flex-col',
    'md:!flex-row',
    'text-center',
    'md:text-auto',
    'mt-4',
    'md:mt-0',
  ],
  theme: {
    extend: {
      colors: palette,
    },
  },
};

export default config;
