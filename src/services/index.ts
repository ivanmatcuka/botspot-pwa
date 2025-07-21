import { typography } from '@botspot/ui';

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

export type Color = {
  background?: string;
  gradient?: string;
  text?: string;
};

export type Attrs = {
  // Allow for arbitrary additional props from custom blocks
  [key: string]: unknown;

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

  rel?: string;
  slug?: string;

  tagName?: string;
  textAlign?: 'left' | 'right' | 'center' | 'justify' | string;
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
    color?: Color;
    dimensions?: {
      minHeight?: string;
    };
    elements?: {
      [key: string]: { color?: Color };
    };
    position?: {
      bottom?: string;
      left?: string;
      right?: string;
      top?: string;
      type?: 'static' | 'sticky' | 'relative' | 'fixed' | 'relative';
    };
    spacing?: {
      blockGap?: string;
      margin?: {
        bottom?: string;
        left?: string;
        right?: string;
        top?: string;
      };
      padding?: {
        bottom?: string;
        left?: string;
        right?: string;
        top?: string;
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
