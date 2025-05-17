'use client';

import { Border } from '@/services';
import { palette } from '@botspot/ui';

export function parseGutenbergBorders(border: Border) {
  const directionMap = {
    bottom: 'borderBottom',
    left: 'borderLeft',
    right: 'borderRight',
    top: 'borderTop',
  };

  const result: Record<string, unknown> = {};

  for (const side in border) {
    const {
      color,
      style = 'solid',
      width,
    } = border[side as keyof Border] ?? {};

    if (width !== '0px') {
      let borderValue = `${width} ${style}`;

      if (color) {
        const resolvedColor = color.replace('var:preset|color|', '');

        const borderPaletteName = resolvedColor?.split('-') ?? '';

        const borderColor = borderPaletteName[0] as keyof typeof palette;
        const borderShade =
          borderPaletteName[1] as keyof (typeof palette)[typeof borderColor];

        borderValue += ` ${
          resolvedColor ? palette?.[borderColor]?.[borderShade] : undefined
        }`;
      }

      result[directionMap[side as keyof Border]] = borderValue;
    }
  }

  return result;
}
