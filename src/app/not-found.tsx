import { Button } from '@/components/adapters/ui/Button';
import { Box, Typography } from '@botspot/ui';

export default function NotFound() {
  return (
    <Box
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
      <Typography fontWeight={600} variant="h1">
        404
      </Typography>
      <Typography mb={8} mt={3} variant="body1">
        Page not Found
      </Typography>

      <Button href="/" variant="primary">
        Go Home
      </Button>
    </Box>
  );
}
