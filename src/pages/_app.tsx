import type { AppProps } from "next/app";
import { useState } from "react";
import { Box, ChakraProvider } from "@chakra-ui/react";

import Navbar from "ui/navbar";
import Cart from "core/cart/components/CartModal";
import { CartContextProvider } from "core/cart/context";
import { theme } from "theme";

function MyApp({ Component, pageProps }: AppProps) {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCart = () => {
    setIsCartOpen((prev) => !prev);
  };

  return (
    <CartContextProvider>
      <ChakraProvider theme={theme}>
        <Navbar toggleCart={toggleCart} />
        <Box mx="4" mt="4">
          <Component {...pageProps} />
        </Box>

        <Cart isOpen={isCartOpen} toggleCart={toggleCart} />
      </ChakraProvider>
    </CartContextProvider>
  );
}

export default MyApp;
