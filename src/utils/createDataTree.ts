// Taken form stackoverflow but modified
import { MenuItem } from '@/services';
import { normalizeURL } from '@/utils/normalizeURL';

export type Link = {
  children?: Link[];
  href: string;
  label: string;
};
export const createDataTree = (dataset: MenuItem[]) => {
  const hashTable: Record<string, Link> = Object.create(null);

  // Initially populating the structure
  for (const data of dataset) {
    hashTable[data.ID] = {
      children: [],
      href: normalizeURL(data.url),
      label: data.title,
    };
  }

  const dataTree: Link[] = [];

  for (const data of dataset) {
    if (data.menu_item_parent !== '0') {
      const children = hashTable[data.menu_item_parent].children;
      children?.push(hashTable[data.ID]);
    } else {
      dataTree.push(hashTable[data.ID]);
    }
  }

  return dataTree;
};
