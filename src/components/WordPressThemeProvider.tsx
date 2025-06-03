'use client';

import { wordPressThemeToMuiTheme } from '@/utils/themeAdapter';
import { ThemeJson } from '@/wordpress/theme-json';
import { theme } from '@botspot/ui';
import { createTheme } from '@mui/material';
import {
  Breakpoints,
  Palette,
  Theme,
  ThemeProvider,
} from '@mui/material/styles';
import { FC, PropsWithChildren, useEffect, useMemo, useState } from 'react';

import { getTheme } from '../services/getTheme';

export const WordPressThemeProvider: FC<PropsWithChildren> = ({ children }) => {
  const [wordPressTheme, setWordPressTheme] = useState<ThemeJson | null>(null);

  useEffect(() => {
    getTheme().then((themeData) => setWordPressTheme(themeData));
  }, []);

  const muiTheme = useMemo(() => {
    if (!wordPressTheme) return theme;
    const extraTheme = wordPressThemeToMuiTheme(wordPressTheme);

    theme.palette = { ...theme.palette, ...extraTheme.palette } as Palette;
    theme.breakpoints = extraTheme.breakpoints as Breakpoints;
    theme.spacing = extraTheme.spacing as Theme['spacing'];
    theme.typography = {
      ...theme.typography,
      ...extraTheme.typography,
    };

    return createTheme(theme);
  }, [wordPressTheme]);

  if (!muiTheme) return null;

  return <ThemeProvider theme={muiTheme}>{children}</ThemeProvider>;
};
