import {
  Block,
  // WPComponentNames
} from '@/services';
import { getWordPressTemplateBlockFn } from '@/utils/getWordPressTemplateBlockFn';
import * as botspot from '@botspot/ui';
import { FC } from 'react';
import { Fragment } from 'react';

import { Button } from './adapters/botspot/Button';
import { DownloadAreaContent } from './adapters/botspot/DownloadAreaContent';
import { Form } from './adapters/botspot/Form';
import { Jobs } from './adapters/botspot/Jobs';
import { People } from './adapters/botspot/People';
import { Posts } from './adapters/botspot/Posts';
import { ProductsList } from './adapters/botspot/ProductsList';
import { ProductsTopic } from './adapters/botspot/ProductsTopic';
import { CoreColumn, CoreColumns } from './adapters/core/CoreColumns';
import { CoreNavigation } from './adapters/core/CoreNavigation';
import { CoreParagraph } from './adapters/core/CoreParagraph';
import { GutenbergBox } from './GutenbergBox';
import { getWordPressTemplatePartFn } from '../utils/getWordPressTemplatePartFn';

type ComponentMap = Record<string, unknown>;

const componentMap: Partial<ComponentMap> = {
  'core/column': CoreColumn,
  'core/columns': CoreColumns,
  'core/group': GutenbergBox,
  'core/heading': CoreParagraph,
  'core/paragraph': CoreParagraph,
  'core/stack': GutenbergBox,

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
export function* generateBlockElements(
  blocks: Block[],
  templateParts: Record<string, { blocks: Block[]; data: unknown }>,
  post?: botspot.CustomPost<Block>,
) {
  for (let index = 0; index < blocks.length; index++) {
    const block = blocks[index];
    const isTemplate = TEMPLATE_BLOCKS.includes(block.blockName);

    if (block.blockName === 'core/navigation') {
      yield <CoreNavigation block={block} key={index} />;
      continue;
    }

    const Component = isTemplate
      ? getWordPressTemplateBlockFn(block.blockName, post)
      : block.blockName === 'core/template-part' && block.attrs.slug
      ? getWordPressTemplatePartFn(block.attrs.slug, templateParts, post)
      : (componentMap[block.blockName] as FC);

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

    const { ref, ...props } = block.attrs;

    if (ref) {
      console.warn('ref was removed from component');
    }

    if (hasChildren) {
      yield (
        // eslint-disable-next-line
        // @ts-ignore
        <Component key={index} {...props}>
          <Fragment key={`child-${index}`}>
            {[...generateBlockElements(block.innerBlocks, templateParts, post)]}
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
  return <>{[...generateBlockElements(blocks, templateParts, post)]}</>;
};
