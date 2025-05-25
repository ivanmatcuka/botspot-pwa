import * as botspot from '@botspot/ui';
import Link from 'next/link';
import { ComponentProps, FC } from 'react';

export const Button: FC<ComponentProps<typeof botspot.Button>> = ({
  component,
  ...rest
}) => <botspot.Button {...rest} component={rest.href ? Link : component} />;
