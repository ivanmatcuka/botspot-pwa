import { getForm } from '@/actions/getForm';
import { getPosts } from '@/actions/getPosts';
import { submitForm } from '@/actions/submitForm';
import { Block, WPComponentNames } from '@/services';
import { getJobs } from '@/services/getJobs';
import { getPeople } from '@/services/getPeople';
import { getProducts } from '@/services/getProducts';
import * as botspot from '@botspot/ui';
import { ComponentProps, FC } from 'react';
import { Fragment } from 'react';

import { NextButton } from './NextButton';
import { ProductsTopic } from './ProductsTopic';

type ComponentMap = Record<WPComponentNames, unknown>;

const Form: FC<ComponentProps<typeof botspot.DynamicForm>> = (props) => (
  <botspot.DynamicForm {...props} getForm={getForm} submitForm={submitForm} />
);

export const Posts: FC<ComponentProps<typeof botspot.Posts>> = async (
  props,
) => <botspot.Posts {...props} getPosts={getPosts} />;

const DownloadAreaContent: FC<
  ComponentProps<typeof botspot.DownloadAreaContent>
> = async (props) => {
  const { data } = await getProducts();
  return (
    <botspot.DownloadAreaContent
      {...props}
      getForm={getForm}
      products={data}
      submitForm={submitForm}
    />
  );
};

const Jobs: FC = async () => {
  const { data } = await getJobs();
  return <botspot.Jobs jobs={data} />;
};

const People: FC = async () => {
  const { data } = await getPeople();
  return <botspot.People people={data} />;
};

const ProductsList: FC<ComponentProps<typeof botspot.ProductsList>> = async (
  props,
) => {
  const { data } = await getProducts();
  return <botspot.ProductsList {...props} products={data} />;
};

const wpToMuiVariant: Record<
  string,
  ComponentProps<typeof botspot.Typography>['variant']
> = {
  button: 'button',
  caption: 'caption',
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h5',
  medium: 'body1',
  paragraph: 'body1',
};

const componentMap: Partial<ComponentMap> = {
  'ui/banner': botspot.Banner,
  'ui/button': NextButton,
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
  'ui/skeleton-video': botspot.SkeletonVideo,
  'ui/tile': botspot.Tile,
  'ui/typography': botspot.Typography,

  // Core
  'core/heading': ({
    content,
    level = 2,
  }: {
    content: string;
    level?: number;
  }) => {
    const variant = wpToMuiVariant[`h${level}`] || 'h2';
    return (
      <botspot.Typography
        dangerouslySetInnerHTML={{ __html: content }}
        variant={variant}
      />
    );
  },
  'core/paragraph': ({
    content,
    fontSize,
  }: {
    content: string;
    fontSize: string;
  }) => {
    return (
      <botspot.Typography
        dangerouslySetInnerHTML={{ __html: content }}
        variant={wpToMuiVariant[fontSize]}
      />
    );
  },
};

type WPBlocksProps = {
  blocks: Block[];
};
export function* renderBlocks(blocks: Block[]) {
  for (let index = 0; index < blocks.length; index++) {
    const block = blocks[index];
    const Component = componentMap[block.blockName] as FC;

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
            {[...renderBlocks(block.innerBlocks)]}
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

export const WPBlocks: FC<WPBlocksProps> = ({ blocks }) => {
  return <>{[...renderBlocks(blocks)]}</>;
};
