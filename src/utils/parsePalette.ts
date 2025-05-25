'use client';

import { palette } from '@botspot/ui';

type HueKey = keyof typeof palette;
type ShadeKey = keyof (typeof palette)[HueKey];

export const parsePalette = (color?: string): [HueKey, ShadeKey] | null => {
  if (!color) return null;

  const paletteValues = color.split('-') ?? '';

  const hue = paletteValues[0] as HueKey;
  const shade = paletteValues[1] as ShadeKey;

  return [hue, shade];
};

export const getPaletteColor = (color?: string) => {
  const [hue, shade] = parsePalette(color) ?? [];
  if (!hue || !shade) return;

  return palette[hue]?.[shade];
};
