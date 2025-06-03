'use client';

import { getForm } from '@/actions/getForm';
import { submitForm } from '@/actions/submitForm';
import { getProducts } from '@/services/getProducts';
import * as botspot from '@botspot/ui';
import { ComponentProps, FC, useEffect, useState } from 'react';

import { mapProps } from './ProductsList';

export const DownloadAreaContent: FC<
  ComponentProps<typeof botspot.DownloadAreaContent>
> = (props) => {
  const [products, setProducts] = useState<botspot.CustomPost[]>([]);

  useEffect(() => {
    getProducts().then(({ data }) => setProducts(data.map(mapProps)));
  }, []);

  return (
    <botspot.DownloadAreaContent
      {...props}
      getForm={getForm}
      products={products}
      submitForm={submitForm}
    />
  );
};
