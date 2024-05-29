/* eslint-disable */
import { Box, Stack, chakra, Text, BoxProps, ButtonGroup, ButtonGroupProps, IconButton, useColorModeValue, HTMLChakraProps, useToken, TextProps, Container } from '@chakra-ui/react'
// import { LinkGrids } from './LinkGrids'
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

export default function FooterChakra(props: HTMLChakraProps<'svg'>) {
  const [white, black] = useToken('colors', ['white', 'gray.800'])
  return (
    <Container maxW={'1000px'} mb={5}>
      <Box as="footer" role="contentinfo" mx="auto" maxW="7xl">
        <Stack>
          <Stack direction="row" spacing="4" align="center" justify="space-between">
            <Text
              bgGradient="linear(to-l, #7928CA, #FF0080)"
              bgClip="text"
              fontSize="20px"
              fontWeight="bold"
              mb={1}
            >
              KayoRonald
            </Text>
            gg
            <SocialMediaLinks />
          </Stack>
        </Stack>
      </Box>
    </Container>
  );
};

const SocialMediaLinks = (props: ButtonGroupProps) => (
  <ButtonGroup variant="ghost" color="gray.600" {...props}>
    <IconButton as="a" href="#" aria-label="LinkedIn" icon={<FaLinkedin fontSize="20px" />} />
    <IconButton as="a" href="#" aria-label="GitHub" icon={<FaGithub fontSize="20px" />} />
    <IconButton as="a" href="#" aria-label="Twitter" icon={<FaTwitter fontSize="20px" />} />
  </ButtonGroup>
);
