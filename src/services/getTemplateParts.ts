import { cache } from 'react';

import { customUrl } from '.';
import { fetchEntity } from './fetchEntity';
import { Template } from './getTemplateBlocksBySlug';

export const getTemplateParts = cache(async () => {
  return await fetchEntity<Record<string, Template> | null>(
    `${customUrl}/template-parts`,
  );
});
