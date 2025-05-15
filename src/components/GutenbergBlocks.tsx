import {
  Block,
  // WPComponentNames
} from '@/services';
import { getFeaturedImageUrl } from '@/utils/getFeaturedImageUrl';
import { parseGutenbergSpacing, Spacing } from '@/utils/parseGutenbergSpacing';
import * as botspot from '@botspot/ui';
import { ComponentProps, FC } from 'react';
import { Fragment } from 'react';

import { CoreColumn, CoreColumns } from './adapters/core/CoreColumns';
import { CoreNavigation } from './adapters/core/CoreNavigation';
import { PostContent, PostContentProps } from './adapters/core/PostContent';
import {
  PostFeaturedImage,
  PostFeaturedImageProps,
} from './adapters/core/PostFeaturedImage';
import { Typography } from './adapters/core/Typography';
import { Button } from './adapters/ui/Button';
import { DownloadAreaContent } from './adapters/ui/DownloadAreaContent';
import { Form } from './adapters/ui/Form';
import { Jobs } from './adapters/ui/Jobs';
import { People } from './adapters/ui/People';
import { Posts } from './adapters/ui/Posts';
import { ProductsList } from './adapters/ui/ProductsList';
import { ProductsTopic } from './adapters/ui/ProductsTopic';
import { GutenbergBox } from './GutenbergBox';

type ComponentMap = Record<string, unknown>;

const componentMap: Partial<ComponentMap> = {
  'core/column': CoreColumn,
  'core/columns': CoreColumns,
  'core/group': GutenbergBox,
  'core/heading': Typography,
  // 'core/navigation': CoreNavigation,
  'core/paragraph': Typography,

  'ui/banner': botspot.Banner,
  'ui/button': Button,
  'ui/download-area-content': DownloadAreaContent,
  'ui/dynamic-form': Form,
  'ui/gallery': botspot.Gallery,
  'ui/gallery-tile': botspot.GalleryTile,
  'ui/iframe': botspot.Iframe,
  'ui/jobs': Jobs,
  'ui/main-block': botspot.MainBlock,
  'ui/media-block': botspot.MediaBlock,
  'ui/page-container': botspot.PageContainer,
  'ui/partner-logo': botspot.PartnerLogo,
  'ui/partner-logo-container': botspot.PartnerLogoContainer,
  'ui/people': People,
  'ui/posts': Posts,
  'ui/products-list': ProductsList,
  'ui/products-topic': ProductsTopic,
  'ui/secondary-block': botspot.SecondaryBlock,
  'ui/share-button': botspot.ShareButton,
  'ui/skeleton-video': botspot.SkeletonVideo,
  'ui/tile': botspot.Tile,
  'ui/typography': botspot.Typography,
};

export const TEMPLATE_BLOCKS = [
  'core/post-content',
  'core/post-title',
  'core/post-featured-image',
];
export function* renderBlocks(
  blocks: Block[],
  templateParts: Record<string, { blocks: Block[]; data: unknown }>,
  post?: botspot.CustomPost<Block>,
) {
  const featuredImage = getFeaturedImageUrl(post);

  const templateBlockMap: Record<(typeof TEMPLATE_BLOCKS)[number], unknown> = {
    'core/post-title': ({ style }: { style: { spacing: Spacing } }) => (
      <botspot.Typography
        variant="h1"
        {...parseGutenbergSpacing(style.spacing)}
      >
        {post?.title.rendered}
      </botspot.Typography>
    ),
    'core/post-content': post?.block_data
      ? (props: Omit<PostContentProps, 'blocks'>) => (
          <PostContent blocks={post.block_data ?? []} {...props} />
        )
      : null,
    'core/post-featured-image':
      featuredImage && post
        ? (props: Omit<PostFeaturedImageProps, 'post'>) => (
            <PostFeaturedImage post={post} {...props} />
          )
        : null,
  };

  for (let index = 0; index < blocks.length; index++) {
    const block = blocks[index];
    const isTemplate = TEMPLATE_BLOCKS.includes(block.blockName);

    const Component = (
      isTemplate
        ? templateBlockMap[block.blockName]
        : block.blockName === 'core/template-part'
        ? () => (
            <GutenbergBlocks
              blocks={templateParts[block.attrs.slug].blocks}
              post={post}
              templateParts={templateParts}
            />
          )
        : componentMap[block.blockName]
    ) as FC;

    if (block.blockName === 'core/navigation') {
      console.log(block);
    }

    if (!Component) {
      yield (
        <div
          dangerouslySetInnerHTML={{ __html: block.rendered ?? '' }}
          key={index}
        />
      );
      continue;
    }

    const hasChildren = block?.innerBlocks?.length > 0;
    const props = block.attrs as ComponentProps<typeof Component>;

    if (hasChildren) {
      yield (
        // eslint-disable-next-line
        // @ts-ignore
        <Component key={index} {...props}>
          <Fragment key={`child-${index}`}>
            {[...renderBlocks(block.innerBlocks, templateParts, post)]}
          </Fragment>
        </Component>
      );
    } else {
      yield (
        // eslint-disable-next-line
        // @ts-ignore
        <Component key={index} {...props} />
      );
    }
  }
}

type WPBlocksProps = {
  blocks: Block[];
  post?: botspot.CustomPost<Block>;
  templateParts?: Record<string, { blocks: Block[]; data: unknown }>;
};
export const GutenbergBlocks: FC<WPBlocksProps> = ({
  blocks,
  post,
  templateParts = {},
}) => {
  return <>{[...renderBlocks(blocks, templateParts, post)]}</>;
};
