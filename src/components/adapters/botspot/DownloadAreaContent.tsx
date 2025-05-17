import { getForm } from '@/actions/getForm';
import { submitForm } from '@/actions/submitForm';
import { getProducts } from '@/services/getProducts';
import * as botspot from '@botspot/ui';
import { ComponentProps, FC } from 'react';

export const DownloadAreaContent: FC<
  ComponentProps<typeof botspot.DownloadAreaContent>
> = async (props) => {
  const { data } = await getProducts();

  return (
    <botspot.DownloadAreaContent
      {...props}
      getForm={getForm}
      products={data}
      submitForm={submitForm}
    />
  );
};
