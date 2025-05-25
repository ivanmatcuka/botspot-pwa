import { CustomPost } from '@botspot/ui';

import { baseUrl, Block } from '.';
import { fetchEntity } from './fetchEntity';

export const getPostBySlug = async (slug: string) => {
  const data = await fetchEntity<CustomPost<Block>[]>(
    `${baseUrl}/posts?slug=${slug}&_embed&acf_format=standard`,
  );

  return data?.[0] ?? null;
};
