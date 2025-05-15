import { customUrl, Block } from '.';
import { fetchEntity } from './fetchEntity';

export const getTemplateParts = async () =>
  await fetchEntity<Record<string, { blocks: Block[]; data: unknown }> | null>(
    `${customUrl}/template-parts`,
  );
