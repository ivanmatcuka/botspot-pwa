'use client';

import { palette } from '@botspot/ui';

type BorderSide = {
  color?: string;
  style?: string;
  width: string;
};

type Border = {
  bottom?: BorderSide;
  left?: BorderSide;
  right?: BorderSide;
  top?: BorderSide;
};

export function convertBorderToMUI(border: Border) {
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
        const [bColor, bShade] = resolvedColor?.split('-') ?? '';

        borderValue += ` ${
          resolvedColor ? palette?.[bColor]?.[bShade] : undefined
        }`;
      }

      result[directionMap[side as keyof Border]] = borderValue;
    }
  }

  return result;
}
