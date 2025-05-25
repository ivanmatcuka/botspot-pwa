import { customUrl, Block } from '.';
import { fetchEntity } from './fetchEntity';

export type Template = { blocks: Block[]; data: unknown };
export const getTemplateBlocksBySlug = async (slug: string) =>
  await fetchEntity<Template>(`${customUrl}/templates/${slug}`);
