import type { AppProps } from "next/app";
import { Box, ChakraProvider } from "@chakra-ui/react";

import Navbar from "ui/navbar";
import Cart from "ui/cart";
import { CartContextProvider } from "core/cart/context";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <CartContextProvider>
        <Navbar />
        <Box mx="4" mt="4">
          <Component {...pageProps} />
        </Box>

        <Cart />
      </CartContextProvider>
    </ChakraProvider>
  );
}

export default MyApp;
