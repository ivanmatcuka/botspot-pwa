// themeAdapter.ts
// Adapter to convert a WordPress theme.json (WP 6.8+) to a Material-UI (MUI) v5+ theme object
// Usage: import { wpThemeToMuiTheme } from './themeAdapter';

import type { Palette, ThemeOptions } from '@mui/material/styles';

import { ThemeJson } from '@/wordpress/theme-json';
import { theme } from '@botspot/ui';
import { createElement, LinkHTMLAttributes } from 'react';
import localFont from 'next/font/local';

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
  wpFontSizes: WordPressFontSize[],
): Record<string, { fontSize: string }> {
  const typography: Record<string, { fontSize: string }> = {};

  wpFontSizes.forEach((font) => {
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

export function wordPressFontFamiliesToMuiFontFaces(settings: ThemeJson) {
  const fontFamilies = [
    ...(settings.typography?.fontFamilies?.custom ?? []),
    ...(settings.typography?.fontFamilies?.theme ?? []),
  ];

  return fontFamilies.map((font) =>
    createElement('link', {
      as: 'font',
      crossOrigin: 'anonymous',
      href: font.fontFace?.[0]?.src || '',
      key: font.slug,
      rel: 'preload',
    }),
  );
}

export function getFontFamilies(
  settings: ThemeJson,
): LinkHTMLAttributes<HTMLLinkElement>[] {
  const fontFamilies = [
    ...(settings.typography?.fontFamilies?.custom ?? []),
    ...(settings.typography?.fontFamilies?.theme ?? []),
  ];

  return fontFamilies.flatMap((font) => {
    const fontFace = font.fontFace?.[0];
    if (!fontFace || !fontFace.src) return [];
    const srcs = Array.isArray(fontFace.src) ? fontFace.src : [fontFace.src];
    return srcs
      .filter((src): src is string => typeof src === 'string')
      .map((src) => ({
        href: src,
        rel: 'stylesheet',
        type: 'text/css',
      }));
  });
}

export function getMainFontFamily(settings: ThemeJson): string | undefined {
  const fontFamilies = settings.typography?.fontFamilies?.custom?.length
    ? settings.typography?.fontFamilies?.custom
    : settings.typography?.fontFamilies?.theme;

  const bodyFont = fontFamilies?.[0];
  if (!bodyFont?.fontFamily) return undefined;

  // Return a CSS string for font-family
  return `body { font-family: ${bodyFont.fontFamily}; }`;
}

// Returns an object: { slug: string, font: ReturnType<typeof localFont> }
// This function should only return the config for the font, not call localFont dynamically
export function getLocalFontConfigsFromTheme(settings: ThemeJson) {
  const fontFamilies = [
    ...(settings.typography?.fontFamilies?.custom ?? []),
    ...(settings.typography?.fontFamilies?.theme ?? []),
  ];

  return fontFamilies
    .filter((font) => Array.isArray(font.fontFace) && font.fontFace.length > 0)
    .map((font) => {
      const sources = font.fontFace!.flatMap((face) => {
        const srcs = Array.isArray(face.src) ? face.src : [face.src];
        return srcs
          .filter((src): src is string => typeof src === 'string')
          .map((src) => ({
            path: src,
            style: face.fontStyle,
            weight: face.fontWeight,
          }));
      });
      return {
        slug: font.slug,
        config: {
          src: sources,
          display: 'swap',
          variable: `--font-${font.slug}`,
        },
      };
    });
}

// Main adapter function
export function wordPressThemeToMuiTheme(settings: ThemeJson): ThemeOptions {
  // Palette
  const palette = wordPressPaletteToMuiPalette(
    settings.color?.palette?.theme || settings.color?.palette?.default || [],
  );

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
      .map((s) => parseInt(s.size, 10))
      .filter((n) => !isNaN(n));
    if (pxSizes.length > 0) spacing = pxSizes[0];
  }

  // Typography
  const fontSizes = [
    ...(settings.typography?.fontSizes?.default ?? []),
    ...(settings.typography?.fontSizes?.theme ?? []),
  ];

  const fontFamilies = [
    ...(settings.typography?.fontFamilies?.custom ?? []),
    ...(settings.typography?.fontFamilies?.theme ?? []),
  ];

  const muiTypography = {
    ...wordPressFontSizesToMuiTypography(fontSizes),
  };

  const fontFamily = fontFamilies.find((f) => f.slug === 'body')?.fontFamily;

  return {
    palette,
    spacing,
    breakpoints: {
      values: breakpoints,
    },
    typography: {
      fontFamily,
      ...muiTypography,
    },
  };
}
