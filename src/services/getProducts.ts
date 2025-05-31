import { Product } from '@/wordpress/component-map';

import { customUrl } from '.';
import { fetchCollection } from './fetchCollection';

export const getProducts = async () => {
  const { count, data } = await fetchCollection<Product>(
    `${customUrl}/flat-posts?type=product`,
  );

  return {
    count,
    data,
  };
};
