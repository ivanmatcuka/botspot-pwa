'use client';

import { Attrs } from '@/services';
import { parseGutenbergSpacing } from '@/utils/parseGutenbergSpacing';
import { Grid, useMediaQuery, useTheme } from '@botspot/ui';
import { FC, PropsWithChildren } from 'react';

export const CoreColumns: FC<PropsWithChildren<Attrs>> = ({
  children,
  style,
}) => {
  const { position, spacing } = style ?? {};
  const { blockGap } = spacing ?? {};
  const { type: positionType, ...inset } = position ?? {};

  /**
   * Example: 'var:preset|spacing|24px'
   */
  const gap = blockGap?.split('|').pop();
  const spacings = parseGutenbergSpacing(spacing);

  return (
    <Grid gap={gap} position={positionType} container {...inset} {...spacings}>
      {children}
    </Grid>
  );
};

export const CoreColumn: FC<PropsWithChildren<Attrs>> = ({
  children,
  style,
  width,
}) => {
  const { breakpoints } = useTheme();
  const { spacing } = style ?? {};

  const matches = useMediaQuery(breakpoints.up('xl'));
  const spacings = parseGutenbergSpacing(spacing);

  return (
    <Grid {...spacings} width={matches ? width : '100%'} item>
      {children}
    </Grid>
  );
};
