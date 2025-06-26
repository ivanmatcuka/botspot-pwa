'use client';

import { GutenbergBlocks } from '@/components/GutenbergBlocks';
import { Template } from '@/services/getTemplateBlocksBySlug';
import { getTemplateParts } from '@/services/getTemplateParts';
import { FC, PropsWithChildren, useEffect, useState } from 'react';

type TemplatePartClientProps = {
  slug: string;
};
export const TemplatePartClient: FC<
  PropsWithChildren<TemplatePartClientProps>
> = ({ slug }) => {
  const [templateParts, setTemplateParts] =
    useState<Record<string, Template>>();
  const templatePart = templateParts?.[slug];

  useEffect(() => {
    getTemplateParts().then((result) => setTemplateParts(result ?? {}));
  }, []);

  if (!templateParts) return;
  if (!templatePart) {
    console.warn('Template part not found: ' + slug);
    return null;
  }

  return <GutenbergBlocks blocks={templatePart.blocks} />;
};
