import { Block } from '@/services';
import * as botspot from '@botspot/ui';
import { GutenbergBlocks } from '../components/GutenbergBlocks';

export const getWordPressTemplatePartFn = (
  slug: string,
  templateParts: Record<string, { blocks: Block[]; data: unknown }>,
  post?: botspot.CustomPost<Block>,
) => {
  return () => (
    <GutenbergBlocks
      blocks={templateParts[slug]?.blocks ?? []}
      post={post}
      templateParts={templateParts}
    />
  );
};
