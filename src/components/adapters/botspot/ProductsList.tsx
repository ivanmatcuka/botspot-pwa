import { getProducts } from '@/services/getProducts';
import * as botspot from '@botspot/ui';
import { ComponentProps, FC } from 'react';

export const ProductsList: FC<
  ComponentProps<typeof botspot.ProductsList>
> = async (props) => {
  const { data } = await getProducts();
  return <botspot.ProductsList {...props} products={data} />;
};
