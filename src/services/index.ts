import { typography } from '@botspot/ui';

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
  /**
   * Optional set of attributes from block comment delimiters
   * Can be null or an object (e.g., { columns: 3 })
   */
  attrs: Attrs;
  /**
   * Name of block (e.g., "core/paragraph")
   */
  blockName: string;
  /**
   * List of inner blocks (recursive structure)
   */
  innerBlocks: Block[];

  /**
   * List of string fragments and null markers
   * where inner blocks were found
   */
  innerContent: (string | null)[];

  /**
   * Resultant HTML after removing inner blocks
   */
  innerHTML: string;

  rendered: string;
};

type BorderSide = {
  color?: string;
  style?: string;
  width: string;
};

export type Border = {
  bottom?: BorderSide;
  left?: BorderSide;
  right?: BorderSide;
  top?: BorderSide;
};

export type Attrs = {
  // Allow for arbitrary additional props from custom blocks
  [key: string]: unknown;

  slug?: string;
  tagName?: string;
  rel?: string;

  // Common implicit attributes from `supports`
  align?: 'left' | 'right' | 'center' | 'wide' | 'full' | string;

  anchor?: string;
  backgroundColor?: string;
  caption?: string;

  // Core WordPress attributes (shared)
  className?: string;
  content?: string;
  fontFamily?: string;

  fontSize?: keyof Omit<typeof typography, 'fontFamily'>;
  gradient?: string;

  height?: string;
  id?: string | number;

  lineHeight?: string;
  margin?: string | Record<string, string>;

  padding?: string | Record<string, string>;
  textColor?: string;
  url?: string;

  width?: string;
  layout?: {
    contentSize?: string;
    flexWrap?: 'wrap' | 'nowrap';
    justifyContent?: string;
    orientation?: 'horizontal' | 'vertical';
    type?: 'constrained' | 'flex' | 'default' | string;
  };

  style?: {
    border?: Border;
    color?: {
      background?: string;
      gradient?: string;
      text?: string;
    };
    dimensions?: {
      minHeight?: string;
    };
    position?: {
      type?: 'static' | 'sticky' | 'relative' | 'fixed' | 'relative';
      bottom?: string;
      left?: string;
      right?: string;
      top?: string;
    };
    spacing?: {
      blockGap?: string;
      margin?: {
        top?: string;
        right?: string;
        bottom?: string;
        left?: string;
      };
      padding?: {
        top?: string;
        right?: string;
        bottom?: string;
        left?: string;
      };
    };
    typography?: {
      fontFamily?: string;
      fontSize?: string;
      lineHeight?: string;
      textTransform?: string;
    };
  };
};

export const baseUrl = `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp/v2`;
export const customUrl = `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/botspot/v1`;
