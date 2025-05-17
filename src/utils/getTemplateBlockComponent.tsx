import {
  CorePostContent,
  CorePostContentProps,
} from '@/components/adapters/core/CorePostContent';
import {
  CorePostFeaturedImage,
  CorePostFeaturedImageProps,
} from '@/components/adapters/core/CorePostFeaturedImage';
import { Block } from '@/services';
import { CustomPost, Typography } from '@botspot/ui';
import { FC } from 'react';

import { getFeaturedImageUrl } from './getFeaturedImageUrl';
import { parseGutenbergSpacing, Spacing } from './parseGutenbergSpacing';

export function getTemplateBlockComponent(
  blockName: string,
  post?: CustomPost<Block>,
): FC | null {
  const featuredImage = getFeaturedImageUrl(post);

  const map: Record<string, FC | null> = {
    'core/post-title': ({
      fontSize,
      style,
    }: {
      fontSize: string;
      style: { spacing: Spacing };
    }) => (
      <Typography variant={fontSize} {...parseGutenbergSpacing(style.spacing)}>
        {post?.title.rendered}
      </Typography>
    ),
    'core/post-content': post?.block_data
      ? (props: Omit<CorePostContentProps, 'blocks'>) => (
          <CorePostContent blocks={post.block_data ?? []} {...props} />
        )
      : null,
    'core/post-featured-image':
      featuredImage && post
        ? (props: Omit<CorePostFeaturedImageProps, 'post'>) => (
            <CorePostFeaturedImage post={post} {...props} />
          )
        : null,
  };

  return map[blockName] || null;
}
