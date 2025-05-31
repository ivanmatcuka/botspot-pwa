import { Product } from '@/wordpress/component-map';

import { customUrl } from '.';
import { fetchEntity } from './fetchEntity';

export const getProductBySlug = async (slug: string) => {
  const data = await fetchEntity<Product[]>(
    `${customUrl}/flat-posts?slug=${slug}&type=product`,
  );

  return data?.[0] ?? null;
};
