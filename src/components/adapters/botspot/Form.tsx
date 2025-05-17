import { getForm } from '@/actions/getForm';
import { submitForm } from '@/actions/submitForm';
import * as botspot from '@botspot/ui';
import { ComponentProps, FC } from 'react';

export const Form: FC<ComponentProps<typeof botspot.DynamicForm>> = (props) => (
  <botspot.DynamicForm {...props} getForm={getForm} submitForm={submitForm} />
);
