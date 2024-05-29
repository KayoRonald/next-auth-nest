import { Box, Flex } from '@chakra-ui/react';

import ButtonToggle from './ButtonToggle';

const Header = () => {
  return (
    <Flex as="header" width="full" pl={1} pr={4} align="center" borderTop="5px solid #8257e5">
      <Box marginLeft="auto" mt={2}>
        <ButtonToggle />
      </Box>
    </Flex>
  );
};

export default Header;
