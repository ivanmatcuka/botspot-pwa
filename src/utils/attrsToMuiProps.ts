'use client';

import { Attrs } from '@/services';
import { parseGutenbergBorders } from '@/utils/parseGutenbergBorders';
import { parseGutenbergSpacing } from '@/utils/parseGutenbergSpacing';
import { getPaletteColor } from '@/utils/parsePalette';

/**
 * Transforms a Gutenberg block Attrs object into MUI Box-compatible props.
 * This includes spacing, borders, palette, layout, and other style props.
 */
export const attrsToMuiProps = (attrs: Attrs) => {
  const {
    backgroundColor,
    className,
    fontFamily,
    fontSize,
    height,
    layout,
    lineHeight,
    style,
    textColor,
    width,
    // ...rest
  } = attrs;

  // Destructuring
  const { border, dimensions, elements, position, spacing, typography } =
    style ?? {};
  const { blockGap } = spacing ?? {};
  const { contentSize, flexWrap, justifyContent, orientation, type } =
    layout ?? {};

  // Spacing
  const gap = blockGap?.split('|').pop();
  const spacings = parseGutenbergSpacing(spacing);

  // Position
  const { type: positionType, ...inset } = position ?? {};

  // Borders
  const borders = border ? parseGutenbergBorders(border) : {};

  // Flex
  const isFlex = type === 'flex';
  const flexDirection = orientation === 'vertical' ? 'column' : 'row';

  // Link color (for sx)
  const linkColorRaw = elements?.link?.color?.text?.split('|').pop();
  const linkColor = linkColorRaw ? getPaletteColor(linkColorRaw) : undefined;

  // Typography
  const muiFontSize = typography?.fontSize || fontSize;
  const muiFontFamily = typography?.fontFamily || fontFamily;
  const muiLineHeight = typography?.lineHeight || lineHeight;
  const muiTextTransform = typography?.textTransform;

  // Color
  const color =
    textColor === 'secondary' ? 'white' : getPaletteColor(textColor);

  // Dimensions
  const minHeight = dimensions?.minHeight;

  // Compose props
  const props = {
    bgcolor: getPaletteColor(backgroundColor),
    boxSizing: 'border-box',
    className,
    color,
    display: isFlex ? 'flex' : undefined,
    flexWrap: isFlex ? flexWrap : undefined,
    fontFamily: muiFontFamily,
    gap,
    height,
    justifyContent,
    lineHeight: muiLineHeight,
    margin: justifyContent === 'center' ? 'auto' : undefined,
    maxWidth: contentSize,
    minHeight,
    position: positionType ?? 'static',
    sx: linkColor ? { a: { color: linkColor } } : undefined,
    textTransform: muiTextTransform,
    width: type === 'constrained' ? '100%' : width,
    flexDirection: (isFlex ? flexDirection : undefined) as
      | 'row'
      | 'column'
      | undefined,
    fontSize: muiFontSize as
      | 'body1'
      | 'button'
      | 'caption'
      | 'h1'
      | 'h2'
      | 'h3'
      | 'h4'
      | 'h5'
      | undefined,
    ...spacings,
    ...borders,
    ...inset,
    // ...rest,
  };

  // Remove undefined fields
  return Object.fromEntries(
    Object.entries(props).filter(([, v]) => v !== undefined),
  );
};
