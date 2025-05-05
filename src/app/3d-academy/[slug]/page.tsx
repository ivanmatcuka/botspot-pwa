import { getPosts } from '@/actions/getPosts';
import { Posts, WPBlocks } from '@/components/WPBlocks';
import { getComponentBySlug } from '@/services/getComponentBySlug';
import { getPage } from '@/services/getPage';
import { getPostBySlug } from '@/services/getPostBySlug';
import { generateSeo } from '@/utils/generateSeo';
import { getFeaturedImageUrl } from '@/utils/getFeaturedImageUrl';
import { Box, LoadingSkeletons, PageContainer, Typography } from '@botspot/ui';
import { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

const POST_SOCIAL_MEDIA_PAGE_SLUG = 'post-social-media';
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
  const [post, page] = await Promise.all([
    getPostBySlug(slug),
    getComponentBySlug(POST_SOCIAL_MEDIA_PAGE_SLUG),
  ]);

  if (!post) return notFound();

  const featuredImage = getFeaturedImageUrl(post);
  const blocks = page?.block_data;

  return (
    <main>
      <PageContainer>
        <Box maxWidth="100%" mx="auto" my={{ md: 15, xs: 8 }}>
          {featuredImage && (
            <Image
              alt={post.title.rendered}
              className="w-full h-auto max-h-[400px] object-cover xs:max-h-[200px] mb-10"
              height={300}
              loading="lazy"
              quality={80}
              src={featuredImage}
              width={1280}
            />
          )}
          <Typography
            dangerouslySetInnerHTML={{ __html: post.title.rendered ?? '' }}
            mb={{ md: 4, xs: 3 }}
            variant="h1"
          />
          <Typography>{post.excerpt.protected}</Typography>
          {post.block_data && <WPBlocks blocks={post.block_data} />}
        </Box>
      </PageContainer>

      <PageContainer>
        <Box
          className="flex gap-2 flex-col md:flex-row items-center"
          maxWidth="100%"
          mx="auto"
        >
          {blocks && <WPBlocks blocks={blocks} />}
        </Box>
      </PageContainer>

      <PageContainer>
        <Box maxWidth="100%" mx="auto" my={{ md: 15, xs: 8 }}>
          <hr />
          <Typography
            component="h2"
            mb={{ md: 6, xs: 3 }}
            mt={{ md: 10, xs: 3 }}
            variant="h2"
          >
            Related Articles:
          </Typography>

          <Suspense fallback={<LoadingSkeletons count={3} />}>
            <Posts getPosts={getPosts} perPage={3} hidePagination />
          </Suspense>
        </Box>
      </PageContainer>
    </main>
  );
}
