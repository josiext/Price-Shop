import type { AppProps } from "next/app";
import { Box, ChakraProvider } from "@chakra-ui/react";

import Navbar from "ui/navbar";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Navbar />
      <Box mx="4" mt="4">
        <Component {...pageProps} />
      </Box>
    </ChakraProvider>
  );
}

export default MyApp;
