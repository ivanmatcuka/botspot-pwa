'use client';

import { GutenbergBlocks } from '@/components/GutenbergBlocks';
import { Template } from '@/services/getTemplateBlocksBySlug';
import { createContext, useContext } from 'react';
import { ReactNode } from 'react';

// Context type
type TemplatePartsContextType = Record<string, ReactNode>;

const TemplatePartsContext = createContext<TemplatePartsContextType | null>(
  null,
);

export function TemplatePartsProvider({
  children,
  templateParts,
}: {
  children: ReactNode;
  templateParts: Record<string, Template>;
}) {
  const renderedTemplateParts = Object.entries(templateParts).reduce(
    (acc, [slug, block]) => ({
      ...acc,
      [slug]: <GutenbergBlocks blocks={block.blocks} />,
    }),
    {},
  );

  return (
    <TemplatePartsContext.Provider value={renderedTemplateParts}>
      {children}
    </TemplatePartsContext.Provider>
  );
}

export function useTemplateParts() {
  const ctx = useContext(TemplatePartsContext);

  if (!ctx) {
    throw new Error(
      'useTemplateParts must be used within a TemplatePartsProvider',
    );
  }

  return ctx;
}
