import { WP_REST_API_Categories } from 'wp-types';

import { baseUrl } from '.';
import { fetchEntity } from './fetchEntity';

export const getCategory = async (slug: string) => {
  const data = await fetchEntity<WP_REST_API_Categories>(
    `${baseUrl}/categories?slug=${slug}`,
  );

  return data?.[0] ?? null;
};
