'use client';

import { Attrs } from '@/services';
import { attrsToMuiProps } from '@/utils/attrsToMuiProps';
import * as botspot from '@botspot/ui';
import { ComponentProps, FC } from 'react';

const wpToMuiVariant: Record<
  string,
  ComponentProps<typeof botspot.Typography>['variant']
> = {
  body1: 'body1',
  body2: 'body2',
  button: 'button',
  caption: 'caption',
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h5',
  medium: 'body1',
  paragraph: 'body1',
};
export const CoreParagraph: FC<Attrs> = ({
  content,
  fontSize = 'body1',
  level,
  ...attrs
}) => {
  const variant = wpToMuiVariant[level ? `h${level}` : fontSize];

  return (
    <botspot.Typography
      dangerouslySetInnerHTML={{ __html: content ?? '' }}
      variant={variant}
      {...attrsToMuiProps(attrs)}
    />
  );
};
