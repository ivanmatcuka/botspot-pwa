import { CoreParagraph } from '@/components/adapters/core/CoreParagraph';
import {
  CorePostContent,
  CorePostContentProps,
} from '@/components/adapters/core/CorePostContent';
import { CorePostFeaturedImage } from '@/components/adapters/core/CorePostFeaturedImage';
import { Attrs } from '@/services';
import { BasePost } from '@/wordpress/component-map';
import { FC } from 'react';

export function getWordPressTemplateBlockFn(
  blockName: string,
  post: BasePost,
): FC | null {
  if (!post?.blocks) return null;

  const map: Record<string, FC | null> = {
    'core/post-content': (props: Omit<CorePostContentProps, 'blocks'>) => (
      <CorePostContent blocks={post.blocks ?? []} {...props} />
    ),
    'core/post-featured-image': (props: Attrs) => (
      <CorePostFeaturedImage post={post} {...props} />
    ),
    'core/post-title': ({ fontSize = 'h1', ...rest }: Attrs) => (
      <CoreParagraph content={post.flat_title} variant={fontSize} {...rest} />
    ),
  };

  return map[blockName] || null;
}
