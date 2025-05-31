'use client';

import { getProducts } from '@/services/getProducts';
import { Product } from '@/wordpress/component-map';
import * as botspot from '@botspot/ui';
import { ComponentProps, FC } from 'react';
import { useEffect, useState } from 'react';

export const mapProps = (product: Product) => ({
  excerpt: product.flat_excerpt || '',
  featuredImage: product.featured_image || '',
  id: product.id,
  info: product.info || {},
  slug: product.slug || '',
  title: product.flat_title || '',
});

export const ProductsList: FC<ComponentProps<typeof botspot.ProductsList>> = (
  props,
) => {
  const [products, setProducts] = useState<botspot.CustomPost[]>([]);

  useEffect(() => {
    getProducts().then(({ data }) => setProducts(data.map(mapProps)));
  }, []);

  return <botspot.ProductsList {...props} products={products} />;
};
