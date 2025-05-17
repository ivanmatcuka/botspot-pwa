'use client';

import { convertBorderToMUI } from '@/utils/convertBorderToMUI';
import { parseGutenbergSpacing } from '@/utils/parseGutenbergSpacing';
import * as botspot from '@botspot/ui';
import { palette } from '@botspot/ui';
import { FC, PropsWithChildren } from 'react';

type GutenbergBoxProps = {
  backgroundColor?: string;
  className?: string;
  layout?: any;
  style?: any;
  tagName?: any;
  textColor?: string;
};
export const GutenbergBox: FC<PropsWithChildren<GutenbergBoxProps>> = ({
  backgroundColor,
  children,
  className,
  layout,
  style,
  tagName,
  textColor,
  // ...rest
}) => {
  const { blockGap } = style?.spacing ?? {};
  const { contentSize, flexWrap, justifyContent, orientation, type } =
    layout ?? {};

  /**
   * Example: 'var:preset|spacing|24px'
   */
  const gap = blockGap?.split('|').pop();

  const isFlex = type === 'flex';
  const spacing = parseGutenbergSpacing(style?.spacing);
  const { type: positionType, ...inset } = style?.position ?? {};

  const borders = convertBorderToMUI(style.border);
  const [bgColor, bgShade] = backgroundColor?.split('-') ?? '';

  return (
    <botspot.Box
      flexDirection={
        isFlex
          ? orientation && orientation === 'vertical'
            ? 'column'
            : 'row'
          : 'column'
      }
      bgcolor={backgroundColor ? palette?.[bgColor]?.[bgShade] : undefined}
      boxSizing="border-box"
      className={className}
      color={textColor === 'secondary' ? 'white' : undefined}
      component={tagName}
      display="flex"
      flexWrap={isFlex ? flexWrap : undefined}
      gap={gap}
      justifyContent={justifyContent}
      margin={justifyContent === 'center' ? 'auto' : undefined}
      maxWidth={contentSize}
      position={positionType}
      width={type === 'constrained' ? '100%' : undefined}
      {...spacing}
      {...borders}
      {...inset}
    >
      {children}
    </botspot.Box>
  );
};
