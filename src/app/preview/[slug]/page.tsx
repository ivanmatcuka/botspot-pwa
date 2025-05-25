/**
 * This page is just a placeholder and is to be used
 * as preview page.
 */
import { getPage } from '@/services/getPage';
import { generatePageMetadata } from '@/utils/generatePageMetadata';
import { Page } from '@/wordpress/Page';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const slug = (await params).slug;
  return generatePageMetadata(slug);
}

export default async function Preview({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  if (!slug) return notFound();

  const page = await getPage(slug);
  if (!page) return notFound();

  return <Page post={page} />;
}
