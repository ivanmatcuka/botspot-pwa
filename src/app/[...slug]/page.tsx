import { WPBlocks } from '@/components/WPBlocks';
import { getPage } from '@/services/getPage';
import { generatePageMetadata } from '@/utils/generatePageMetadata';
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

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const slug = (await params).slug.pop();
  if (!slug) return notFound();

  const page = await getPage(slug);
  if (!page) return notFound();

  const blocks = page.block_data;

  return (
    <main className="w-full">{blocks && <WPBlocks blocks={blocks} />}</main>
  );
}
