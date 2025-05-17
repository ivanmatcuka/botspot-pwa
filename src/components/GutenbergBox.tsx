'use client';

import { Attrs } from '@/services';
import { parseGutenbergBorders } from '@/utils/parseGutenbergBorders';
import { parseGutenbergSpacing } from '@/utils/parseGutenbergSpacing';
import { Box, palette } from '@botspot/ui';
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
  const backgroundPaletteName = backgroundColor?.split('-') ?? '';

  const bgColor = backgroundPaletteName[0] as keyof typeof palette;
  const bgShade =
    backgroundPaletteName[1] as keyof (typeof palette)[typeof bgColor];

  const flexDirection = orientation === 'vertical' ? 'column' : 'row';

  return (
    <Box
      bgcolor={backgroundColor ? palette?.[bgColor]?.[bgShade] : undefined}
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
      width={type === 'constrained' ? '100%' : undefined}
      {...spacings}
      {...borders}
      {...inset}
    >
      {children}
    </Box>
  );
};
