'use client';

import { Attrs } from '@/services';
import { attrsToMuiProps } from '@/utils/attrsToMuiProps';
import { Grid, useMediaQuery, useTheme } from '@botspot/ui';
import { FC, PropsWithChildren } from 'react';

export const CoreColumns: FC<PropsWithChildren<Attrs>> = ({
  children,
  ...attrs
}) => {
  return (
    <Grid {...attrsToMuiProps(attrs)} container>
      {children}
    </Grid>
  );
};

export const CoreColumn: FC<PropsWithChildren<Attrs>> = ({
  children,
  width,
  ...attrs
}) => {
  const { breakpoints } = useTheme();

  const matches = useMediaQuery(breakpoints.up('xl'));

  return (
    <Grid {...attrsToMuiProps(attrs)} width={matches ? width : '100%'} item>
      {children}
    </Grid>
  );
};
