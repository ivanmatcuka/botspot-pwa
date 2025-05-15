import { getPeople } from '@/services/getPeople';
import * as botspot from '@botspot/ui';
import { FC } from 'react';

export const People: FC = async () => {
  const { data } = await getPeople();
  return <botspot.People people={data} />;
};
