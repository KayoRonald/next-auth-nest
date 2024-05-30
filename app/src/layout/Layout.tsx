import { Box } from "@chakra-ui/react";
import Header from "./Header";
import { LayoutProps } from "@/types";
import FooterChakra from "./Footer";

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Header />
      <Box transition="0.5s ease-out" minHeight="100vh">
        <Box margin="0 auto" maxWidth={1300}>
          <Box margin="8">
            <Box as="main" marginY={22}>
              {children}
            </Box>
          </Box>
        </Box>
      </Box>
      <FooterChakra/>
    </>
  );
};

export default Layout;
