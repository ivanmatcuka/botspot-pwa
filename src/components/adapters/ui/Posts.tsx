import { getPosts } from '@/actions/getPosts';
import * as botspot from '@botspot/ui';
import { ComponentProps, FC } from 'react';

export const Posts: FC<ComponentProps<typeof botspot.Posts>> = async (
  props,
) => <botspot.Posts {...props} getPosts={getPosts} />;
