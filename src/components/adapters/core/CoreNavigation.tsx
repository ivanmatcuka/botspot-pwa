'use client';

import { GutenbergBox } from '@/components/GutenbergBox';
import { Navbar } from '@/components/Navbar/Navbar';
import { Block } from '@/services';
import { getPaletteColor } from '@/utils/parsePalette';
import { Typography } from '@botspot/ui';
import parse from 'html-react-parser';
import Link from 'next/link';
import {
  Children,
  FC,
  isValidElement,
  memo,
  PropsWithChildren,
  ReactElement,
  ReactNode,
  useMemo,
} from 'react';

type MenuItem = {
  children?: MenuItem[];
  disabled?: boolean;
  href?: string;
  label: string;
  onClick?: () => void;
};

function getChildByClass(className: string) {
  return (child: ReactNode) => {
    if (!isValidElement(child)) return;
    const classList = child.props?.className.split(' ') ?? [];
    return classList.includes(className);
  };
}

const DEFAULT_LINK = { href: '#', label: 'Unknown link' };
function reactElementToMenuItem(child: ReactNode): MenuItem {
  if (!isValidElement(child)) return DEFAULT_LINK;

  const childrenElements = Children.toArray(child.props.children);
  const submenu = childrenElements.find(
    getChildByClass('wp-block-navigation-submenu'),
  );
  const anchor = childrenElements.find(
    getChildByClass('wp-block-navigation-item__content'),
  );

  if (!isValidElement(anchor)) return DEFAULT_LINK;

  const label = Children.toArray(anchor.props.children).find(
    getChildByClass('wp-block-navigation-item__label'),
  );
  const link = {
    href: isValidElement(anchor) ? anchor.props.href : anchor,
    label: isValidElement(label) ? label.props.children : label,
  };

  // Base condition
  if (!isValidElement(submenu)) return link;

  const children = Children.toArray(submenu.props.children).map(
    reactElementToMenuItem,
  );

  return { children, ...link };
}

function extractLinks({ props: { children } }: ReactElement): MenuItem[] {
  return Children.toArray(children).map(reactElementToMenuItem);
}

type CoreNavigationProps = {
  block: Block;
};
export const CoreNavigation: FC<CoreNavigationProps> = memo(
  function CoreNavigation({ block }) {
    const parsed = useMemo(() => parse(block.rendered), [block.rendered]);

    const navElement = useMemo(() => {
      if (!isValidElement<PropsWithChildren>(parsed)) return null;
      return Children.toArray(parsed.props.children)[0];
    }, [parsed]);

    const links = useMemo(() => {
      if (!isValidElement(navElement)) return null;

      return extractLinks(navElement);
    }, [navElement]);

    if (!isValidElement<PropsWithChildren<HTMLElement>>(navElement))
      return null;

    const classList = navElement?.props?.className.split(' ') ?? [];
    const isHeader = classList.includes('wp-header-navigation');

    const { className, fontSize, layout, style, textColor } = block.attrs;

    return isHeader ? (
      <Navbar navItems={links ?? []} />
    ) : (
      <GutenbergBox className={className} layout={layout} style={style}>
        {links?.map((link) => (
          <Typography
            color={getPaletteColor(textColor)}
            component={Link}
            href={link.href || ''}
            key={link.href}
            variant={fontSize}
          >
            {link.label}
          </Typography>
        ))}
      </GutenbergBox>
    );
  },
);
