import { Box } from '@botspot/ui';
import { FC, PropsWithChildren } from 'react';

export const FullScreenBox: FC<PropsWithChildren> = async ({ children }) => (
  <Box
    alignItems="center"
    display="flex"
    flex={1}
    flexDirection="column"
    height="100%"
    justifyContent="center"
    maxWidth="xl"
    mx="auto"
    my={20}
    textAlign="center"
  >
    {children}
  </Box>
);
