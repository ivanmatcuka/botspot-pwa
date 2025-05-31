'use server';

import { CustomPost } from '@botspot/ui';

import { Block, customUrl } from '../services';
import { fetchCollection } from '../services/fetchCollection';

export const getPosts = async (page = 1, perPage = 12) => {
  const { count, data } = await fetchCollection<CustomPost<Block>>(
    `${customUrl}/flat-posts?orderby=modified&per_page=${perPage}&page=${page}&category=3d-academy`,
  );

  return {
    count,
    data,
  };
};
