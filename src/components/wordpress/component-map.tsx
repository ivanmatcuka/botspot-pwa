import * as botspot from '@botspot/ui';

import { Button } from '../adapters/botspot/Button';
import { DownloadAreaContent } from '../adapters/botspot/DownloadAreaContent';
import { Form } from '../adapters/botspot/Form';
import { Jobs } from '../adapters/botspot/Jobs';
import { People } from '../adapters/botspot/People';
import { Posts } from '../adapters/botspot/Posts';
import { ProductsList } from '../adapters/botspot/ProductsList';
import { ProductsTopic } from '../adapters/botspot/ProductsTopic';
import { CoreColumn, CoreColumns } from '../adapters/core/CoreColumns';
import { CoreParagraph } from '../adapters/core/CoreParagraph';
import { GutenbergBox } from '../GutenbergBox';

export type ComponentMap = Record<string, unknown>;

const CORE_COMPONENT_MAP: Partial<ComponentMap> = {
  'core/column': CoreColumn,
  'core/columns': CoreColumns,
  'core/group': GutenbergBox,
  'core/heading': CoreParagraph,
  'core/paragraph': CoreParagraph,
  'core/stack': GutenbergBox,
};

const BOTSPOT_COMPONENT_MAP: Partial<ComponentMap> = {
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

export const COMPONENT_MAP: Partial<ComponentMap> = {
  ...CORE_COMPONENT_MAP,
  ...BOTSPOT_COMPONENT_MAP,
};
