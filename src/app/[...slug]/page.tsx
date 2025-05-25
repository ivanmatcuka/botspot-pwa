import { getPage } from '@/services/getPage';
import { generatePageMetadata } from '@/utils/generatePageMetadata';
import { Page } from '@/wordpress/Page';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  const slug = (await params).slug.pop();
  return generatePageMetadata(slug);
}

export default async function WildcardPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const slug = (await params).slug.pop();
  if (!slug) return notFound();

  const page = await getPage(slug);
  if (!page) return notFound();

  return <Page post={page} />;
}
