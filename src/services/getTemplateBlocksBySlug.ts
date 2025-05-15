import { customUrl, Block } from '.';
import { fetchEntity } from './fetchEntity';

export const getTemplateBlocksBySlug = async (slug: string) =>
  await fetchEntity<{ blocks: Block[]; data: unknown }>(
    `${customUrl}/templates/${slug}`,
  );
