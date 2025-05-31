import { Job } from '@/wordpress/component-map';

import { customUrl } from '.';
import { fetchCollection } from './fetchCollection';

export const getJobs = async () => {
  return fetchCollection<Job>(`${customUrl}/flat-posts?category=jobs`);
};
