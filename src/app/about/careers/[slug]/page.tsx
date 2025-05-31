import { getPostBySlug } from '@/services/getPostBySlug';
import { generateSeo } from '@/utils/generateSeo';
import { Page } from '@/wordpress/Page';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

const DEFAULT_META = {
  title: 'botspot – Job Page',
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const slug = (await params).slug;
  const job = await getPostBySlug(slug);

  if (!job) return DEFAULT_META;

  return generateSeo(job) ?? DEFAULT_META;
}

export default async function Job({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const job = await getPostBySlug(slug);

  if (!job) return notFound();

  return <Page post={job} />;
}
