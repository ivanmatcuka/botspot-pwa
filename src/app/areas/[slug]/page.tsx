import { AttachedPost } from '@/components/AttachedPost';
import { GutenbergBlocks } from '@/components/GutenbergBlocks';
import { getAreaBySlug } from '@/services/getAreaBySlug';
import { getPostBySlug } from '@/services/getPostBySlug';
import { generateSeo } from '@/utils/generateSeo';
import { TemplatePart } from '@/wordpress/TemplatePart';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

const DEFAULT_META = {
  title: 'botspot – Area Page',
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const slug = (await params).slug;
  const area = await getAreaBySlug(slug);

  if (!area) return DEFAULT_META;

  return generateSeo(area) ?? DEFAULT_META;
}

export default async function Area({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const area = await getAreaBySlug(slug);

  if (!area) return notFound();

  const { blocks, info } = area;
  const { post, 'post-cta': postCta } = info ?? {};

  const postBySlug = post?.post_name
    ? await getPostBySlug(post.post_name)
    : null;

  return (
    <main className="">
      <TemplatePart slug="header" />
      {blocks && <GutenbergBlocks blocks={blocks} />}

      {postBySlug && (
        <Suspense>
          <AttachedPost
            post={postBySlug}
            postCta={postCta}
            relatedImage={postBySlug?.featured_image ?? ''}
          />
        </Suspense>
      )}
      <TemplatePart slug="footer" />
    </main>
  );
}
