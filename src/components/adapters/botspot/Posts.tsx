import { getPostsMapped } from '@/actions/getPostsMapped';
import * as botspot from '@botspot/ui';
import { ComponentProps, FC } from 'react';

export const Posts: FC<ComponentProps<typeof botspot.Posts>> = (props) => {
  return <botspot.Posts {...props} getPosts={getPostsMapped} />;
};
