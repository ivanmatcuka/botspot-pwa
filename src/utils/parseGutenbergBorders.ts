'use client';

import { Border } from '@/services';

import { getPaletteColor } from './parsePalette';

type BorderKey = keyof Border;

export function parseGutenbergBorders(border: Border) {
  const directionMap = {
    bottom: 'borderBottom',
    left: 'borderLeft',
    right: 'borderRight',
    top: 'borderTop',
  };

  const result: Record<string, unknown> = {};

  for (const side in border) {
    const { color, style = 'solid', width } = border[side as BorderKey] ?? {};

    if (width !== '0px') {
      let borderValue = `${width} ${style}`;

      if (color) {
        const resolvedColor = color.replace('var:preset|color|', '');

        if (resolvedColor) borderValue += ` ${getPaletteColor(resolvedColor)}`;
      }

      result[directionMap[side as BorderKey]] = borderValue;
    }
  }

  return result;
}
