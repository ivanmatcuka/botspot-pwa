import { parseGutenbergSpacing } from '@/utils/parseGutenbergSpacing';
import * as botspot from '@botspot/ui';
import { FC, PropsWithChildren } from 'react';

type GutenbergBoxProps = {
  backgroundColor?: string;
  layout?: any;
  style?: any;
  tagName?: any;
  textColor?: string;
};
export const GutenbergBox: FC<PropsWithChildren<GutenbergBoxProps>> = ({
  backgroundColor,
  children,
  layout,
  style,
  tagName,
  textColor,
  ...rest
}) => {
  const { blockGap } = style?.spacing ?? {};
  const { contentSize, flexDirection, flexWrap, justifyContent, type } =
    layout ?? {};

  /**
   * Example: 'var:preset|spacing|24px'
   */
  const gap = blockGap?.split('|').pop();

  const isFlex = type === 'flex';
  const spacing = parseGutenbergSpacing(style?.spacing);

  return (
    <botspot.Box
      component={tagName}
      display="flex"
      flexDirection={isFlex ? flexDirection : 'column'}
      flexWrap={isFlex ? flexWrap : undefined}
      gap={gap}
      justifyContent={justifyContent}
      maxWidth={contentSize}
      {...spacing}
      bgcolor={backgroundColor}
      color={textColor === 'secondary' ? 'white' : 'black'}
    >
      {children}
    </botspot.Box>
  );
};
