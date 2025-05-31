'use server';

import { BasePost } from '@/wordpress/component-map';

import { getPosts } from './getPosts';

const mapProps = (post: BasePost) => ({
  excerpt: post.flat_excerpt || '',
  featuredImage: post.featured_image || '',
  id: post.id,
  slug: post.slug || '',
  title: post.flat_title || '',
});
export const getPostsMapped = async (...args: Parameters<typeof getPosts>) => {
  const { count, data } = await getPosts(...args);
  return {
    count,
    data: data.map(mapProps),
  };
};
