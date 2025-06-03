'use client';

import { Attrs, Block } from '@/services';
import { attrsToMuiProps } from '@/utils/attrsToMuiProps';
import { Box } from '@botspot/ui';
import { FC } from 'react';

import { GutenbergBlocks } from '../../GutenbergBlocks';

export type CorePostContentProps = {
  blocks: Block[];
  className?: string;
} & Attrs;
export const CorePostContent: FC<CorePostContentProps> = ({
  blocks,
  ...rest
}) => {
  return (
    <Box
      display="flex"
      flex={1}
      flexDirection="column"
      {...attrsToMuiProps(rest)}
    >
      <GutenbergBlocks blocks={blocks} />
    </Box>
  );
};
