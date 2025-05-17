import { parseGutenbergSpacing } from '@/utils/parseGutenbergSpacing';
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

type CoreParagraphProps = {
  backgroundColor: string;
  content: string;
  fontSize?: string;
  level?: number;
  style: any;
  textColor?: string;
};
export const CoreParagraph: FC<CoreParagraphProps> = ({
  backgroundColor,
  content,
  fontSize = 'body1',
  level,
  style,
  textColor,
}) => {
  const variant = wpToMuiVariant[level ? `h${level}` : fontSize];
  const spacing = parseGutenbergSpacing(style.spacing);

  return (
    <botspot.Typography
      bgcolor={backgroundColor}
      color={textColor}
      dangerouslySetInnerHTML={{ __html: content }}
      variant={variant}
      {...spacing}
    />
  );
};
