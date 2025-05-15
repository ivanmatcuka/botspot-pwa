/**
 * This ocmponent is meant to make it easy to attach a post
 * to an Area or a Product via WordPress CMS.
 */
import { CustomPost, GalleryTile, SecondaryBlock } from '@botspot/ui';

import { Button } from './adapters/ui/Button';

const ACADEMY_URL = '3d-academy'; // Legacy
const POST_CTA_DEFAULT = 'Read Full Story'; // Legacy

type AttachedPostProps = {
  post: CustomPost;
  postCta?: string;
  relatedImage: string;
};
export default async function AttachedPost({
  post,
  postCta = POST_CTA_DEFAULT,
  relatedImage,
}: AttachedPostProps) {
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
}
