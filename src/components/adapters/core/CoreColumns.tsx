import { Grid } from '@botspot/ui';
import { FC, PropsWithChildren } from 'react';

export const CoreColumns: FC<PropsWithChildren> = ({ children, ...rest }) => {
  // console.log(rest);
  return <Grid container>{children}</Grid>;
};

type CoreColumnProps = {
  width: string;
};
export const CoreColumn: FC<PropsWithChildren<CoreColumnProps>> = ({
  children,
  width,
  ...rest
}) => {
  // console.log(rest);
  return (
    <Grid width={width} item>
      {children}
    </Grid>
  );
};
