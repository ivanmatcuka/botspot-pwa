'use client';

import { Attrs } from '@/services';
import { attrsToMuiProps } from '@/utils/attrsToMuiProps';
import { Box } from '@botspot/ui';
import { FC, PropsWithChildren } from 'react';

export const GutenbergBox: FC<PropsWithChildren<Attrs>> = ({
  children,
  ...attrs
}) => <Box {...attrsToMuiProps(attrs)}>{children}</Box>;
