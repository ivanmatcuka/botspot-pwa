import { CustomPost } from '@botspot/ui';

import { baseUrl, Block } from '.';
import { fetchEntity } from './fetchEntity';

export const getPost = async (id: number) => {
  const data = await fetchEntity<CustomPost<Block>[]>(
    `${baseUrl}/posts?include=${id}&_embed`,
  );

  return data?.[0] ?? null;
};
