import { Block } from '@/services';
import { getTemplateBlocksBySlug } from '@/services/getTemplateBlocksBySlug';
import { getTemplateParts } from '@/services/getTemplateParts';
import { CustomPost, Typography } from '@botspot/ui';
import { FC, PropsWithChildren } from 'react';

import { Button } from './adapters/ui/Button';
import { FullScreenBox } from './FullScreenBox';
import { GutenbergBlocks } from './GutenbergBlocks';

type TemplateProps = {
  post: CustomPost<Block>;
};
export const Template: FC<PropsWithChildren<TemplateProps>> = async ({
  post,
}) => {
  const fallback = post.block_data ? (
    <GutenbergBlocks blocks={post.block_data} />
  ) : (
    <FullScreenBox>
      <Typography fontWeight={600} mb={8} variant="h1">
        This post has no template
      </Typography>
      <Button href="/" variant="primary">
        Go Home
      </Button>
    </FullScreenBox>
  );

  if (!post.template) return fallback;

  const template = await getTemplateBlocksBySlug(post.template);
  if (!template?.data) return fallback;

  const templateParts = (await getTemplateParts()) ?? undefined;

  return (
    <GutenbergBlocks
      blocks={template.blocks ?? []}
      post={post}
      templateParts={templateParts}
    />
  );
};
