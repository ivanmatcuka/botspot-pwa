/**
 * This ocmponent is meant to make it easy to attach a post
 * to an Area or a Product via WordPress CMS.
 */
import { CustomPost, GalleryTile, SecondaryBlock } from '@botspot/ui';
import { FC } from 'react';

import { Button } from './adapters/botspot/Button';

const ACADEMY_URL = '3d-academy'; // Legacy
const POST_CTA_DEFAULT = 'Read Full Story'; // Legacy

type AttachedPostProps = {
  post: CustomPost;
  postCta?: string;
  relatedImage: string;
};
export const AttachedPost: FC<AttachedPostProps> = async ({
  post,
  postCta = POST_CTA_DEFAULT,
  relatedImage,
}) => {
  return (
    <GalleryTile imgUrl={relatedImage}>
      <SecondaryBlock
        headline={post.title.rendered}
        sublineElement={post.excerpt.rendered}
      >
        <Button href={`/${ACADEMY_URL}/${post.slug}`} variant="primary">
          {postCta}
        </Button>
      </SecondaryBlock>
    </GalleryTile>
  );
};
