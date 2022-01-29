import type { AppProps } from "next/app";
import { Box, ChakraProvider } from "@chakra-ui/react";

import Navbar from "ui/navbar";
import Cart, { CartContext } from "ui/cart";
import { useState } from "react";

function MyApp({ Component, pageProps }: AppProps) {
  const [cart, setCart] = useState({ isOpen: false });

  return (
    <ChakraProvider>
      <CartContext.Provider value={cart}>
        <Navbar openCart={() => setCart({ ...cart, isOpen: true })} />
        <Box mx="4" mt="4">
          <Component {...pageProps} />
        </Box>

        <Cart onClose={() => setCart({ ...cart, isOpen: false })} />
      </CartContext.Provider>
    </ChakraProvider>
  );
}

export default MyApp;
