'use client';

import { Attrs } from '@/services';
import { parseGutenbergBorders } from '@/utils/parseGutenbergBorders';
import { parseGutenbergSpacing } from '@/utils/parseGutenbergSpacing';
import { getPaletteColor } from '@/utils/parsePalette';
import { Box } from '@botspot/ui';
import { FC, PropsWithChildren } from 'react';

export const GutenbergBox: FC<PropsWithChildren<Attrs>> = ({
  backgroundColor,
  children,
  className,
  layout,
  style,
  textColor,
}) => {
  const { position, spacing } = style ?? {};
  const { blockGap } = spacing ?? {};
  const { contentSize, flexWrap, justifyContent, orientation, type } =
    layout ?? {};

  /**
   * Example: 'var:preset|spacing|24px'
   */
  const gap = blockGap?.split('|').pop();

  const isFlex = type === 'flex';
  const spacings = parseGutenbergSpacing(spacing);
  const { type: positionType, ...inset } = position ?? {};

  const borders = style?.border ? parseGutenbergBorders(style.border) : {};

  const flexDirection = orientation === 'vertical' ? 'column' : 'row';

  const linkColorRaw = style?.elements?.link?.color?.text?.split('|').pop();
  const linkColor = linkColorRaw ? getPaletteColor(linkColorRaw) : undefined;

  return (
    <Box
      bgcolor={getPaletteColor(backgroundColor)}
      boxSizing="border-box"
      className={className}
      color={textColor === 'secondary' ? 'white' : undefined}
      display="flex"
      flexDirection={isFlex ? flexDirection : 'column'}
      flexWrap={isFlex ? flexWrap : undefined}
      gap={gap}
      justifyContent={justifyContent}
      margin={justifyContent === 'center' ? 'auto' : undefined}
      maxWidth={contentSize}
      position={positionType ?? 'static'}
      sx={{ a: { color: linkColor } }}
      width={type === 'constrained' ? '100%' : undefined}
      {...spacings}
      {...borders}
      {...inset}
    >
      {children}
    </Box>
  );
};
