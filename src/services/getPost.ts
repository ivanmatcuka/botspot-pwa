import { BasePost } from '@/wordpress/component-map';

import { customUrl } from '.';
import { fetchEntity } from './fetchEntity';

export const getPost = async (id: number) => {
  const data = await fetchEntity<BasePost[]>(
    `${customUrl}/flat-posts?id=${id}`,
  );

  return data?.[0] ?? null;
};
