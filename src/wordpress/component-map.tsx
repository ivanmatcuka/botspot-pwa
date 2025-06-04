import { Button } from '@/components/adapters/botspot/Button';
import { DownloadAreaContent } from '@/components/adapters/botspot/DownloadAreaContent';
import { Form } from '@/components/adapters/botspot/Form';
import { Jobs } from '@/components/adapters/botspot/Jobs';
import { People } from '@/components/adapters/botspot/People';
import { Posts } from '@/components/adapters/botspot/Posts';
import { ProductsList } from '@/components/adapters/botspot/ProductsList';
import { ProductsTopic } from '@/components/adapters/botspot/ProductsTopic';
import {
  CoreColumn,
  CoreColumns,
} from '@/components/adapters/core/CoreColumns';
import { CoreImage } from '@/components/adapters/core/CoreImage';
import { CoreParagraph } from '@/components/adapters/core/CoreParagraph';
import { GutenbergBox } from '@/components/GutenbergBox';
import { Block } from '@/services';
import * as botspot from '@botspot/ui';

export type ComponentMap = Record<string, unknown>;

const CORE_COMPONENT_MAP: Partial<ComponentMap> = {
  'core/column': CoreColumn,
  'core/columns': CoreColumns,
  'core/group': GutenbergBox,
  'core/heading': CoreParagraph,
  'core/image': CoreImage,
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

export type BasePost = {
  blocks?: Block[];
  content?: string;
  featured_image?: string;
  flat_excerpt?: string;
  flat_title?: string;
  id: number;
  slug?: string;
  template?: string;
};

export type Job = Pick<BasePost, 'slug' | 'flat_title' | 'flat_excerpt'>;
export type Person = Pick<
  BasePost,
  'id' | 'flat_title' | 'flat_excerpt' | 'slug' | 'featured_image'
>;
export type Product = {
  info?: botspot.CustomFields;
} & BasePost;
