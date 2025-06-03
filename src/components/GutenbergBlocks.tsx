import { Block } from '@/services';
import { getWordPressTemplatePartFn } from '@/utils/getWordPressTemplatePartFn';
import { COMPONENT_MAP, ComponentMap } from '@/wordpress/component-map';
import { FC } from 'react';
import { Fragment } from 'react';

import { CoreNavigation } from './adapters/core/CoreNavigation';

type WPBlocksProps = {
  blocks: Block[];
  dynamicComponentMap?: ComponentMap;
};
export const GutenbergBlocks: FC<WPBlocksProps> = ({
  blocks,
  dynamicComponentMap = {},
}) => {
  const componentMap = {
    ...dynamicComponentMap,
    ...COMPONENT_MAP,
  };

  return (
    <>
      {blocks.map((block, index) => {
        // Special case
        if (block.blockName === 'core/navigation') {
          return <CoreNavigation block={block} key={index} />;
        }

        const Component =
          block.blockName === 'core/template-part' && block.attrs.slug
            ? getWordPressTemplatePartFn(block.attrs.slug)
            : (componentMap[block.blockName] as FC);

        if (!Component) {
          return (
            <div
              dangerouslySetInnerHTML={{ __html: block.rendered ?? '' }}
              key={index}
            />
          );
        }

        const hasChildren = block?.innerBlocks?.length > 0;
        const { ref, ...props } = block.attrs;

        if (ref) {
          console.warn('ref was removed from component');
        }

        if (hasChildren) {
          return (
            // eslint-disable-next-line
            // @ts-ignore
            <Component key={index} {...props}>
              <Fragment key={`child-${index}`}>
                <GutenbergBlocks
                  blocks={block.innerBlocks}
                  dynamicComponentMap={componentMap}
                />
              </Fragment>
            </Component>
          );
        } else {
          return (
            // eslint-disable-next-line
            // @ts-ignore
            <Component key={index} {...props} />
          );
        }
      })}
    </>
  );
};
