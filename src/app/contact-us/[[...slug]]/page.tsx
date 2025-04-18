import { WPBlocks } from '@/components/WPBlocks';
import { getPage } from '@/services';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  title: 'CONTACT US – botspot',
};

export default async function ContactUs({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const slug = (await params).slug?.[0];
  const page = await getPage('contact-us');
  if (!page) return notFound();

  const blocks = page.block_data;

  return <main className="">{blocks && <WPBlocks blocks={blocks} />}</main>;
}
