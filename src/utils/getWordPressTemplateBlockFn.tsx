import {
  CorePostContent,
  CorePostContentProps,
} from '@/components/adapters/core/CorePostContent';
import { CorePostFeaturedImage } from '@/components/adapters/core/CorePostFeaturedImage';
import { Attrs, Block } from '@/services';
import { CustomPost, Typography } from '@botspot/ui';
import { FC } from 'react';

import { getFeaturedImageUrl } from './getFeaturedImageUrl';
import { parseGutenbergSpacing } from './parseGutenbergSpacing';

export function getWordPressTemplateBlockFn(
  blockName: string,
  post?: CustomPost<Block>,
): FC | null {
  const featuredImage = getFeaturedImageUrl(post);

  const map: Record<string, FC | null> = {
    'core/post-title': ({ fontSize = 'h1', style }: Attrs) => (
      <Typography variant={fontSize} {...parseGutenbergSpacing(style?.spacing)}>
        {post?.title.rendered}
      </Typography>
    ),
    'core/post-content': (props: Omit<CorePostContentProps, 'blocks'>) => (
      <CorePostContent blocks={post?.block_data ?? []} {...props} />
    ),
    'core/post-featured-image':
      featuredImage && post
        ? (props: Attrs) => <CorePostFeaturedImage post={post} {...props} />
        : null,
  };

  return map[blockName] || null;
}
