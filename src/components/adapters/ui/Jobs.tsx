import { getJobs } from '@/services/getJobs';
import * as botspot from '@botspot/ui';
import { FC } from 'react';

export const Jobs: FC = async () => {
  const { data } = await getJobs();
  return <botspot.Jobs jobs={data} />;
};
