// themeAdapter.ts
// Adapter to convert a WordPress theme.json (WP 6.8+) to a Material-UI (MUI) v5+ theme object
// Usage: import { wpThemeToMuiTheme } from './themeAdapter';

import type { Palette, ThemeOptions } from '@mui/material/styles';

import { ThemeJson } from '@/wordpress/theme-json';
import { theme } from '@botspot/ui';

// Update the path below to the correct relative path if needed

// Types for palette, font sizes, and font families
interface WordPressPaletteColor {
  color: string;
  name: string;
  slug: string;
}
interface WordPressFontSize {
  name?: string;
  size: string;
  slug: string;
}

// Only the main color keys (excluding common, text, divider, action, background)
export const PALETTE_MAIN_COLOR_KEYS = [
  'primary',
  'secondary',
  'error',
  'warning',
  'info',
  'success',
  'grey',
];

// Special keys for black/white
export const PALETTE_COMMON_COLOR_KEYS = ['black', 'white'];

// Helper to convert WP color palette to nested MUI palette
function wordPressPaletteToMuiPalette(
  wordPressPalette: WordPressPaletteColor[],
): Partial<Palette> {
  const palette: Record<string, unknown> = {};

  wordPressPalette.forEach(({ color, slug }) => {
    if (!slug || !color) return;

    if (PALETTE_COMMON_COLOR_KEYS.includes(slug)) {
      if (!palette.common) palette.common = {};
      (palette.common as Record<string, string>)[slug] = color;
    } else if (PALETTE_MAIN_COLOR_KEYS.includes(slug)) {
      palette[slug] = { main: color };
    } else {
      // For any other slug, add to palette.extra or keep as {slug}.main
      if (!palette.extra) palette.extra = {};
      (palette.extra as Record<string, { main: string }>)[slug] = {
        main: color,
      };
    }
  });

  return palette;
}

// Helper to convert WP font sizes to MUI typography
function wordPressFontSizesToMuiTypography(
  wordPressFontSizes: WordPressFontSize[],
): Record<string, { fontSize: string }> {
  const typography: Record<string, { fontSize: string }> = {};

  wordPressFontSizes.forEach((font) => {
    if (font.slug && font.size) {
      typography[font.slug] = { fontSize: font.size };
    }
  });

  return typography;
}

// Helper to convert WP layout sizes to MUI breakpoints
function wordPressLayoutToMuiBreakpoints(layout?: {
  contentSize?: string;
  wideSize?: string;
}) {
  const breakpoints = theme.breakpoints.values;

  if (layout) {
    breakpoints.sm = parseInt(layout.contentSize ?? '');
    breakpoints.xl = parseInt(layout.wideSize ?? '');
  }

  return breakpoints;
}

// Main adapter function
export function wordPressThemeToMuiTheme(settings: ThemeJson): ThemeOptions {
  // Palette
  const palette = wordPressPaletteToMuiPalette([
    ...(settings.color?.palette?.theme ?? []),
    ...(settings.color?.palette?.default ?? []),
  ]);

  // Breakpoints
  const breakpoints = wordPressLayoutToMuiBreakpoints(settings.layout);

  // Spacing
  let spacing = 8;
  const spacingSizes =
    settings.spacing?.spacingSizes?.theme ||
    settings.spacing?.spacingSizes?.default ||
    [];
  if (Array.isArray(spacingSizes)) {
    const pxSizes = spacingSizes
      .map((s) => parseInt(s.size))
      .filter((n) => !isNaN(n));

    if (pxSizes.length > 0) spacing = pxSizes[0];
  }

  // Typography
  const fontSizes = settings.typography?.fontSizes?.theme ?? [];

  const fontFamilies = [
    ...(settings.typography?.fontFamilies?.custom ?? []),
    ...(settings.typography?.fontFamilies?.theme ?? []),
  ];

  const muiTypography = {
    ...wordPressFontSizesToMuiTypography(fontSizes),
  };

  // console.log('MUI Typography:', muiTypography);

  // const fontFamily = fontFamilies.find((f) => f.slug === 'body')?.fontFamily;

  return {
    palette,
    spacing,
    breakpoints: {
      values: breakpoints,
    },
    typography: {
      // fontFamily,
      // ...muiTypography,
    },
  };
}
