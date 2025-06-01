import { ThemeJson } from '@/wordpress/theme-json';

import { customUrl } from '.';
import { fetchEntity } from './fetchEntity';

export const getTheme = async () => {
  const data = await fetchEntity<ThemeJson>(`${customUrl}/theme`);

  return data;
};
