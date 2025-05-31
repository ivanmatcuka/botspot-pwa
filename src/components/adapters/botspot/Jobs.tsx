'use client';

import { getJobs } from '@/services/getJobs';
import { Job } from '@/wordpress/component-map';
import * as botspot from '@botspot/ui';
import { FC, useEffect, useState } from 'react';

const mapProps = (job: Job) => ({
  excerpt: job.flat_excerpt || '',
  slug: job.slug || '',
  title: job.flat_title || '',
});

export const Jobs: FC = () => {
  const [jobs, setJobs] = useState<ReturnType<typeof mapProps>[]>([]);

  useEffect(() => {
    getJobs().then(({ data }) => setJobs(data.map(mapProps)));
  }, []);

  return <botspot.Jobs jobs={jobs} />;
};
