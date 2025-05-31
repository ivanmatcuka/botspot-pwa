import { Attrs } from '@/services';
import { BasePost } from '@/wordpress/component-map';
import Image from 'next/image';
import { FC } from 'react';

import { GutenbergBox } from '../../GutenbergBox';

export type CorePostFeaturedImageProps = {
  post: BasePost;
} & Attrs;
export const CorePostFeaturedImage: FC<CorePostFeaturedImageProps> = ({
  className,
  height = '100',
  post,
  rel,
  style,
  width = '100',
}) => {
  return (
    <GutenbergBox style={style}>
      <Image
        alt={post.flat_title ?? ''}
        className={className}
        height={parseInt(height)}
        rel={rel ?? ''}
        src={post.featured_image ?? ''}
        width={parseInt(width)}
      />
    </GutenbergBox>
  );
};
