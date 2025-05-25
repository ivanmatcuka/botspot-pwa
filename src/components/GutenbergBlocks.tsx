import { Block } from '@/services';
import { getWordPressTemplatePartFn } from '@/utils/getWordPressTemplatePartFn';
import { COMPONENT_MAP, ComponentMap } from '@/wordpress/component-map';
import { FC } from 'react';
import { Fragment } from 'react';

import { CoreNavigation } from './adapters/core/CoreNavigation';

export function* generateBlockElements(
  blocks: Block[],
  componentMap: ComponentMap,
) {
  for (let index = 0; index < blocks.length; index++) {
    const block = blocks[index];

    // Special case
    if (block.blockName === 'core/navigation') {
      yield <CoreNavigation block={block} key={index} />;
      continue;
    }

    const Component =
      block.blockName === 'core/template-part' && block.attrs.slug
        ? getWordPressTemplatePartFn(block.attrs.slug)
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
            {[...generateBlockElements(block.innerBlocks, componentMap)]}
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
  dynamicComponentMap?: ComponentMap;
};
export const GutenbergBlocks: FC<WPBlocksProps> = async ({
  blocks,
  dynamicComponentMap = {},
}) => {
  const componentMap = {
    ...dynamicComponentMap,
    ...COMPONENT_MAP,
  };

  return <>{[...generateBlockElements(blocks, componentMap)]}</>;
};
