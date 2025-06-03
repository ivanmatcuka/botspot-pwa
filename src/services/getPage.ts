import { BasePost } from '@/wordpress/component-map';
import { cache } from 'react';

import { customUrl } from '.';
import { fetchEntity } from './fetchEntity';

export const getPage = cache(async (slug: string) => {
  const data = await fetchEntity<BasePost[]>(
    `${customUrl}/flat-posts?slug=${slug}&type=page`,
  );

  return data?.[0] ?? null;
});
