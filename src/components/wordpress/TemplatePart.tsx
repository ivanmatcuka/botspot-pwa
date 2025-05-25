import { getTemplateParts } from '@/services/getTemplateParts';
import { FC, PropsWithChildren } from 'react';

import { GutenbergBlocks } from '../GutenbergBlocks';

export const TEMPLATE_BLOCKS = [
  'core/post-content',
  'core/post-title',
  'core/post-featured-image',
];

type TemplatePartProps = {
  slug: string;
};
export const TemplatePart: FC<PropsWithChildren<TemplatePartProps>> = async ({
  slug,
}) => {
  const templateParts = (await getTemplateParts()) ?? {};
  const templatePart = templateParts[slug];

  if (!templatePart) {
    console.warn('Template part not found: ' + slug);
    return null;
  }

  return <GutenbergBlocks blocks={templatePart.blocks} />;
};
