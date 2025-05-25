import { Button } from '@/components/adapters/botspot/Button';
import { AttachedPost } from '@/components/AttachedPost';
import { GutenbergBlocks } from '@/components/GutenbergBlocks';
import { getPost } from '@/services/getPost';
import { getProductBySlug } from '@/services/getProductBySlug';
import { generateSeo } from '@/utils/generateSeo';
import { getFeaturedImageUrl } from '@/utils/getFeaturedImageUrl';
import { TemplatePart } from '@/wordpress/TemplatePart';
import { CustomFields } from '@botspot/ui';
import { Banner, MainBlock, MediaBlock, PageContainer } from '@botspot/ui';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

const POST_CTA_DEFAULT = 'Read Full Story'; // Legacy
const DOWNLOAD_AREA_FALLBACK = '/download-area';
const DEFAULT_META = {
  title: 'botspot – Product Page',
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const slug = (await params).slug;
  const product = await getProductBySlug(slug);

  if (!product) return DEFAULT_META;

  return generateSeo(product) ?? DEFAULT_META;
}

export default async function Product({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  if (!slug) return notFound();

  const product = await getProductBySlug(slug);
  if (!product) return notFound();

  const blocks = product.block_data;

  const {
    banner,
    closeup,
    'demo-cta': demoCta,
    'demo-url': demoUrl,
    'download-cta': downloadCta,
    'download-url': downloadUrl = DOWNLOAD_AREA_FALLBACK,
    'first-headline': firstHeadline,
    'first-subline': firstSubline,
    picture,
    post: postId,
    'post-cta': postCta = POST_CTA_DEFAULT,
    'second-headline': secondHeadline,
    'second-subline': secondSubline,
  }: Partial<CustomFields> = product.acf ?? {};

  const post = postId ? await getPost(+String(postId)) : null;
  const relatedImage = getFeaturedImageUrl(post ?? undefined);

  return (
    <main className="">
      <TemplatePart slug="header" />
      {banner && (
        <Banner
          headline={product.title.rendered}
          mediaBlockOptions={{ assetUrl: banner }}
          sublineElement={product.excerpt.rendered}
        >
          <Button
            href={`${downloadUrl}?default=${product.title.rendered}`}
            variant="primary"
          >
            {downloadCta}
          </Button>
          <Button href={demoUrl} target="_blank" variant="secondary">
            {demoCta}
          </Button>
        </Banner>
      )}

      {/* XS */}
      <MediaBlock
        assetUrl={picture}
        containerClassName="block md:hidden"
        objectFit="cover"
        banner
      />

      {/* MD */}
      <MediaBlock
        assetUrl={picture}
        containerClassName="hidden md:block"
        objectFit="contain"
        banner
      />

      <PageContainer my={{ md: 10, xs: 5 }}>
        <MainBlock headline={firstHeadline} subline={firstSubline} />
      </PageContainer>

      <MediaBlock assetUrl={closeup} objectFit="cover" fullHeight />

      <PageContainer mt={{ md: 15, xs: 10 }}>
        <MainBlock headline={secondHeadline} subline={secondSubline} />
      </PageContainer>

      {!!blocks && <GutenbergBlocks blocks={blocks} />}

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
