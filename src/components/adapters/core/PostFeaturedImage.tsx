import { Block } from '@/services';
import { getFeaturedImageUrl } from '@/utils/getFeaturedImageUrl';
import { CustomPost } from '@botspot/ui';
import Image from 'next/image';
import { FC } from 'react';

import { GutenbergBox } from '../../GutenbergBox';

export type PostFeaturedImageProps = {
  className: string;
  height: string;
  post: CustomPost<Block>;
  rel?: string;
  style?: any;
  width: string;
};
export const PostFeaturedImage: FC<PostFeaturedImageProps> = ({
  className,
  height,
  post,
  rel,
  style,
  width,
}) => {
  const featuredImage = getFeaturedImageUrl(post);

  return (
    <GutenbergBox style={style}>
      <Image
        alt={featuredImage}
        className={className}
        height={parseInt(height)}
        rel={rel}
        src={featuredImage}
        width={parseInt(width)}
      />
    </GutenbergBox>
  );
};
