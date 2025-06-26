import { GutenbergBlocks } from '@/components/GutenbergBlocks';
import { getTemplateParts } from '@/services/getTemplateParts';
import { FC, PropsWithChildren } from 'react';

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
