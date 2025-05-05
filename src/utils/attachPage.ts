import { CustomPost } from '@botspot/ui';

import { Link } from './createDataTree';
import { normalizeURL } from './normalizeURL';

export const attachPage = (
  page: CustomPost,
  navbarItems: Link[],
  domain: 'areas' | 'products',
) => {
  const linkItem = {
    href: `/${domain}/${page.slug}`,
    label: page.title.rendered,
  };

  const link = page.acf?.['parent-page'] ?? '';

  const parent = navbarItems.find(
    (item) => normalizeURL(item.href) === normalizeURL(link),
  );

  parent?.children?.push(linkItem);
};
