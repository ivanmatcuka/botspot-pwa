import { getPost } from '@/services/getPost';
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
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const id = (await params).id;
  const job = await getPost(+id);

  if (!job) return DEFAULT_META;

  return generateSeo(job) ?? DEFAULT_META;
}

export default async function Job({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const job = await getPost(+id);

  if (!job) return notFound();

  return <Page post={job} />;
}
