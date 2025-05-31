import { getPage } from '@/services/getPage';
import { Metadata } from 'next';

import { generateSeo } from './generateSeo';

export const generatePageMetadata = async (
  slug?: string,
): Promise<Metadata> => {
  const defaultMeta = {
    title: 'botspot',
  };

  if (!slug) return defaultMeta;

  const page = await getPage(slug);
  if (!page) return defaultMeta;

  return (
    generateSeo(page) ?? {
      title: `${page.flat_title} – botspot`,
    }
  );
};
