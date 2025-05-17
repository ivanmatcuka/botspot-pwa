'use client';

import { GutenbergBox } from '@/components/GutenbergBox';
import { Navbar } from '@/components/Navbar/Navbar';
import { Block } from '@/services';
import { palette, Typography } from '@botspot/ui';
import parse from 'html-react-parser';
import Link from 'next/link';
import { Children, FC, isValidElement, ReactElement, ReactNode } from 'react';

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
function recursive(child: ReactNode): MenuItem {
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

  if (!isValidElement(submenu)) return link;

  const children = Children.toArray(submenu.props.children).map(recursive);

  return { children, ...link };
}

function extractLinks(node: ReactElement): MenuItem[] {
  const links: MenuItem[] = Children.toArray(node.props.children).map(
    recursive,
  );

  return links;
}

type CoreNavigation = {
  block: Block;
};

export const CoreNavigation: FC<CoreNavigation> = ({ block }) => {
  const parsed = parse(block.rendered);

  if (!isValidElement(parsed)) return null;
  if (!parsed?.props.children) return null;

  const navElement = Children.toArray(parsed.props.children)[0];
  if (!navElement) return null;
  if (!isValidElement(navElement)) return null;

  const classList = navElement.props?.className.split(' ') ?? [];
  const isHeader = classList.includes('wp-header-navigation');

  const links = extractLinks(navElement);

  const { fontSize, layout, style, textColor } = block.attrs;
  const [color, shade] = textColor?.split('-') ?? '';

  return isHeader ? (
    <Navbar navItems={links} />
  ) : (
    <GutenbergBox layout={layout} style={style}>
      {links.map((link) => (
        <Typography
          color={palette?.[color]?.[shade]}
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
};
