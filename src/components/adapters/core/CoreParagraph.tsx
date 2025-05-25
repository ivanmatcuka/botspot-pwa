'use client';

import { Attrs } from '@/services';
import { parseGutenbergSpacing } from '@/utils/parseGutenbergSpacing';
import { getPaletteColor } from '@/utils/parsePalette';
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
  backgroundColor,
  content,
  fontSize = 'body1',
  level,
  style,
  textColor,
}) => {
  const variant = wpToMuiVariant[level ? `h${level}` : fontSize];
  const spacing = parseGutenbergSpacing(style?.spacing);

  const linkColorRaw = style?.elements?.link?.color?.text?.split('|').pop();
  const linkColor = linkColorRaw ? getPaletteColor(linkColorRaw) : undefined;

  return (
    <botspot.Typography
      bgcolor={getPaletteColor(backgroundColor)}
      color={textColor}
      dangerouslySetInnerHTML={{ __html: content ?? '' }}
      sx={{ a: { color: linkColor ? `${linkColor} !important` : undefined } }}
      variant={variant}
      {...spacing}
    />
  );
};
