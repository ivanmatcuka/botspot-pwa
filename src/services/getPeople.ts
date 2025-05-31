import { Person } from '@/wordpress/component-map';

import { customUrl } from '.';
import { fetchCollection } from './fetchCollection';

export const getPeople = async () => {
  return fetchCollection<Person>(
    `${customUrl}/flat-posts?category=people&per_page=100`,
  );
};
