import { Button as BotspotButton } from '@botspot/ui';
import Link from 'next/link';
import { ComponentProps, FC } from 'react';

export const Button: FC<ComponentProps<typeof BotspotButton>> = ({
  component,
  ...rest
}) => {
  // console.log(rest);
  return <BotspotButton {...rest} component={rest.href ? Link : component} />;
};
