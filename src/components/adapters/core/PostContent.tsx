import { Block } from '@/services';
import { FC } from 'react';

import { GutenbergBlocks } from '../../GutenbergBlocks';
import { GutenbergBox } from '../../GutenbergBox';

export type PostContentProps = {
  blocks: Block[];
  style?: any;
};
export const PostContent: FC<PostContentProps> = ({ blocks, style }) => (
  <GutenbergBox style={style}>
    <GutenbergBlocks blocks={blocks} />
  </GutenbergBox>
);
