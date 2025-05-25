import { Page } from '@/components/wordpress/Page';
import { getPostBySlug } from '@/services/getPostBySlug';
import { generateSeo } from '@/utils/generateSeo';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

const DEFAULT_META = {
  title: 'botspot – 3D Academy',
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const slug = (await params).slug;
  if (!slug) return DEFAULT_META;

  const post = await getPostBySlug(slug);
  if (!post) return DEFAULT_META;

  return generateSeo(post) ?? DEFAULT_META;
}

export default async function Post({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const post = await getPostBySlug(slug);

  if (!post) return notFound();

  return <Page post={post} />;
}
