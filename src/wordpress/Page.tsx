import { GutenbergBlocks } from '@/components/GutenbergBlocks';
import { getTemplateBlocksBySlug } from '@/services/getTemplateBlocksBySlug';
import { getWordPressTemplateBlockFn } from '@/utils/getWordPressTemplateBlockFn';
import { FC, PropsWithChildren } from 'react';

import { BasePost } from './component-map';

export const TEMPLATE_BLOCKS = [
  'core/post-content',
  'core/post-title',
  'core/post-featured-image',
];

type PageProps = {
  post: BasePost;
  showTemplate?: boolean;
};
export const Page: FC<PropsWithChildren<PageProps>> = async ({
  post,
  showTemplate = true,
}) => {
  const blocks = post.blocks ?? [];

  if (!post.template || !showTemplate) {
    return <GutenbergBlocks blocks={blocks} />;
  }

  const template = await getTemplateBlocksBySlug(post.template);

  if (!template?.data) return <GutenbergBlocks blocks={blocks} />;

  const templateBlocksMap = TEMPLATE_BLOCKS.reduce(
    (prev, curr) => ({
      ...prev,
      [curr]: getWordPressTemplateBlockFn(curr, post),
    }),
    {},
  );

  return (
    <GutenbergBlocks
      blocks={template.blocks ?? []}
      dynamicComponentMap={templateBlocksMap}
    />
  );
};
