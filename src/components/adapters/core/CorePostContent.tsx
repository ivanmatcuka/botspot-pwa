import { Block } from '@/services';
import { FC } from 'react';

import { GutenbergBlocks } from '../../GutenbergBlocks';
import { GutenbergBox } from '../../GutenbergBox';

export type CorePostContentProps = {
  blocks: Block[];
  className?: string;
  style?: any;
};
export const CorePostContent: FC<CorePostContentProps> = ({
  blocks,
  className,
  style,
}) => (
  <GutenbergBox className={className} style={style}>
    <GutenbergBlocks blocks={blocks} />
  </GutenbergBox>
);
