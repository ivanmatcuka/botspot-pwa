import { BasePost } from '@/wordpress/component-map';
import { Metadata } from 'next';
import { Robots } from 'next/dist/lib/metadata/types/metadata-types';
import { OpenGraph } from 'next/dist/lib/metadata/types/opengraph-types';
import { Twitter } from 'next/dist/lib/metadata/types/twitter-types';

export const generateSeo = (post: { yoast_head_json?: any } & BasePost) => {
  const yoast = post.yoast_head_json;
  const graph = yoast?.schema?.['@graph']?.[0];

  if (!yoast) return null;

  const result: Metadata = yoast
    ? {
        authors: graph?.author,
        description: yoast.description,
        keywords: graph?.keywords,
        publisher: yoast.article_publisher,
        robots: yoast.robots as Robots,
        title: yoast.title,
        openGraph: {
          description: yoast.og_description,
          images: yoast.og_image,
          locale: yoast.og_locale,
          siteName: yoast.og_site_name,
          title: yoast.og_title,
          type: yoast.og_type,
          url: yoast.og_url,
        } as OpenGraph,
        twitter: {
          card: yoast.twitter_card,
          creator: yoast.twitter_creator,
          site: yoast.twitter_site,
        } as Twitter,
      }
    : {
        title: `${post.flat_title} – botspot`,
      };

  return result;
};
