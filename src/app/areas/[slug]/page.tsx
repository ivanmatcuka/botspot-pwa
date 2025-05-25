import { AttachedPost } from '@/components/AttachedPost';
import { GutenbergBlocks } from '@/components/GutenbergBlocks';
import { getAreaBySlug } from '@/services/getAreaBySlug';
import { getPost } from '@/services/getPost';
import { generateSeo } from '@/utils/generateSeo';
import { getFeaturedImageUrl } from '@/utils/getFeaturedImageUrl';
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

  const { acf, block_data: blocks } = area;
  const { post: postId, 'post-cta': postCta } = acf ?? {};

  const post = postId ? await getPost(+String(postId)) : null;
  const relatedImage = getFeaturedImageUrl(post ?? undefined);

  return (
    <main className="">
      <TemplatePart slug="header" />
      {blocks && <GutenbergBlocks blocks={blocks} />}

      {post && (
        <Suspense>
          <AttachedPost
            post={post}
            postCta={postCta}
            relatedImage={relatedImage}
          />
        </Suspense>
      )}
      <TemplatePart slug="footer" />
    </main>
  );
}
