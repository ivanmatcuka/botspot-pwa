import { Attrs, Block } from '@/services';
import { getFeaturedImageUrl } from '@/utils/getFeaturedImageUrl';
import { CustomPost } from '@botspot/ui';
import Image from 'next/image';
import { FC } from 'react';

import { GutenbergBox } from '../../GutenbergBox';

export type CorePostFeaturedImageProps = {
  post: CustomPost<Block>;
} & Attrs;
export const CorePostFeaturedImage: FC<CorePostFeaturedImageProps> = ({
  className,
  height = '100',
  post,
  rel,
  style,
  width = '100',
}) => {
  const featuredImage = getFeaturedImageUrl(post);

  return (
    <GutenbergBox style={style}>
      <Image
        alt={featuredImage}
        className={className}
        height={parseInt(height)}
        rel={rel ?? ''}
        src={featuredImage}
        width={parseInt(width)}
      />
    </GutenbergBox>
  );
};
