export type ThemeJson = {
  appearanceTools?: boolean;
  blocks?: Record<string, unknown>;
  useRootPaddingAwareAlignments?: boolean;
  background?: {
    backgroundImage?: boolean;
    backgroundSize?: boolean;
  };
  border?: {
    color?: boolean;
    radius?: boolean;
    style?: boolean;
    width?: boolean;
  };
  color?: {
    background?: boolean;
    button?: boolean;
    caption?: boolean;
    custom?: boolean;
    customDuotone?: boolean;
    customGradient?: boolean;
    defaultDuotone?: boolean;
    defaultGradients?: boolean;
    defaultPalette?: boolean;
    heading?: boolean;
    link?: boolean;
    text?: boolean;
    duotone?: {
      default?: Array<{
        colors: [string, string];
        name: string;
        slug: string;
      }>;
    };
    gradients?: {
      default?: Array<{
        gradient: string;
        name: string;
        slug: string;
      }>;
    };
    palette?: {
      default?: Array<{
        color: string;
        name: string;
        slug: string;
      }>;
      theme?: Array<{
        color: string;
        name: string;
        slug: string;
      }>;
    };
  };
  dimensions?: {
    aspectRatio?: boolean;
    defaultAspectRatios?: boolean;
    minHeight?: boolean;
    aspectRatios?: {
      default?: Array<{
        name: string;
        ratio: string;
        slug: string;
      }>;
    };
  };
  layout?: {
    contentSize?: string;
    wideSize?: string;
  };
  position?: {
    sticky?: boolean;
  };
  shadow?: {
    defaultPresets?: boolean;
    presets?: {
      default?: Array<{
        name: string;
        shadow: string;
        slug: string;
      }>;
    };
  };
  spacing?: {
    blockGap?: boolean;
    customSpacingSize?: boolean;
    defaultSpacingSizes?: boolean;
    margin?: boolean;
    padding?: boolean;
    units?: string[];
    spacingScale?: {
      default?: {
        increment: number;
        mediumStep: number;
        operator: string;
        steps: number;
        unit: string;
      };
    };
    spacingSizes?: {
      default?: Array<{
        name: string;
        size: string;
        slug: string;
      }>;
      theme?: Array<{
        name: string;
        size: string;
        slug: string;
      }>;
    };
  };
  typography?: {
    customFontSize?: boolean;
    defaultFontSizes?: boolean;
    dropCap?: boolean;
    fontStyle?: boolean;
    fontWeight?: boolean;
    letterSpacing?: boolean;
    lineHeight?: boolean;
    textAlign?: boolean;
    textDecoration?: boolean;
    textTransform?: boolean;
    writingMode?: boolean;
    fontFamilies?: {
      custom?: Array<{
        fontFamily: string;
        name: string;
        slug: string;
        fontFace?: Array<{
          fontFamily: string;
          fontStyle: string;
          fontWeight: string;
          src: string;
        }>;
      }>;
      theme?: Array<{
        fontFamily: string;
        name: string;
        slug: string;
        fontFace?: Array<{
          fontFamily: string;
          fontStretch?: string;
          fontStyle?: string;
          fontWeight?: string;
          src?: string[];
        }>;
      }>;
    };
    fontSizes?: {
      default?: Array<{
        name: string;
        size: string;
        slug: string;
      }>;
      theme?: Array<{
        name: string;
        size: string;
        slug: string;
      }>;
    };
  };
};
