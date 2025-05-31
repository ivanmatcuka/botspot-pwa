import { BasePost } from '@/wordpress/component-map';

import { customUrl } from '.';
import { fetchEntity } from './fetchEntity';

export const getPage = async (slug: string) => {
  const data = await fetchEntity<BasePost[]>(
    `${customUrl}/flat-posts?slug=${slug}&type=page`,
  );

  return data?.[0] ?? null;
};
