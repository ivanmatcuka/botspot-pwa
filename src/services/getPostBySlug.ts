import { BasePost } from '@/wordpress/component-map';

import { customUrl } from '.';
import { fetchEntity } from './fetchEntity';

export const getPostBySlug = async (slug: string) => {
  const data = await fetchEntity<BasePost[]>(
    `${customUrl}/flat-posts?slug=${slug}`,
  );

  return data?.[0] ?? null;
};
