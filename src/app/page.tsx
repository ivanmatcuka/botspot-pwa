export const revalidate = 0;

import { getPage } from '@/services/getPage';
import { generatePageMetadata } from '@/utils/generatePageMetadata';
import { Page } from '@/wordpress/Page';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

const HOME_SLUG = 'home';

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata(HOME_SLUG);
}

export default async function Home() {
  const page = await getPage(HOME_SLUG);
  if (!page) return notFound();

  return <Page post={page} />;
}
