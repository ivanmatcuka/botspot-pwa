export type WPComponentNames =
  | 'ui/banner'
  | 'ui/button'
  | 'ui/media-block'
  | 'ui/main-block'
  | 'ui/page-container'
  | 'ui/secondary-block'
  | 'ui/tile'
  | 'ui/gallery-tile'
  | 'ui/iframe'
  | 'ui/skeleton-video'
  | 'ui/typography'
  | 'ui/gallery'
  | 'ui/posts'
  | 'ui/people'
  | 'ui/jobs'
  | 'ui/partner-logo'
  | 'ui/partner-logo-container'
  | 'ui/dynamic-form'
  | 'ui/download-area-content'
  | 'ui/products-topic'
  | 'ui/products-list'
  | 'ui/share-button';

export type Block = {
  attrs: unknown;
  blockName: string;
  innerBlocks: Block[];
  innerContent: unknown[];
  innerHTML: string;
  rendered: string;
};

export const baseUrl = `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp/v2`;
export const customUrl = `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/botspot/v1`;
