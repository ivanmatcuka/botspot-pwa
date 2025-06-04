'use client';

import { getProducts } from '@/services/getProducts';
import * as botspot from '@botspot/ui';
import { useSearchParams } from 'next/navigation';
import { ComponentProps, FC, Suspense, useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { mapProps } from './ProductsList';

const ProductsTopicWrapper: FC<ComponentProps<typeof botspot.ProductsTopic>> = (
  props,
) => {
  const { setValue } = useFormContext() ?? {};
  const searchParams = useSearchParams();
  const search = searchParams.get('default') ?? props.defaultProductName;
  const [products, setProducts] = useState<botspot.CustomPost[]>([]);
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    getProducts().then(({ count, data }) => {
      setProducts(data.map(mapProps));
      setCount(count);
    });
  }, []);

  return (
    <botspot.ProductsTopic
      {...props}
      defaultProductName={search}
      getProducts={async () => ({ count, data: products })}
      onChange={(topic) => setValue?.('your-topic', topic)}
    />
  );
};

export const ProductsTopic: FC<ComponentProps<typeof botspot.ProductsTopic>> = (
  props,
) => (
  <Suspense>
    <ProductsTopicWrapper {...props} />
  </Suspense>
);
