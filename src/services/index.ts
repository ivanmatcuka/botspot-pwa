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
  | 'core/heading'
  | 'core/paragraph';

export type Block = {
  attrs: unknown;
  blockName: WPComponentNames;
  innerBlocks: Block[];
  innerContent: unknown[];
  innerHTML: string;
  rendered: string;
};

export type MenuItem = {
  attr_title: string;
  classes: string[];
  comment_count: string;
  comment_status: string;
  db_id: number;
  description: string;
  filter: string;
  guid: string;
  ID: number;
  menu_item_parent: string;
  menu_order: number;
  object: string;
  object_id: string;
  ping_status: string;
  pinged: string;
  post_author: string;
  post_content: string;
  post_content_filtered: string;
  post_date: string;
  post_date_gmt: string;
  post_excerpt: string;
  post_mime_type: string;
  post_modified: string;
  post_modified_gmt: string;
  post_name: string;
  post_parent: number;
  post_password: string;
  post_status: string;
  post_title: string;
  post_type: string;
  target: string;
  title: string;
  to_ping: string;
  type: string;
  type_label: string;
  url: string;
  xfn: string;
};

export const baseUrl = `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp/v2`;
export const customUrl = `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/botspot/v1`;
