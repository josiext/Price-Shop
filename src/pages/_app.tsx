import type { AppProps } from "next/app";
import { useState } from "react";
import { Box, ChakraProvider } from "@chakra-ui/react";

import Navbar from "ui/navbar";
import Cart from "core/cart/components/CartModal";
import { CartContextProvider, useCartContext } from "core/cart/context";
import { theme } from "theme";
import { useProductCategories } from "core/productCategories/hooks";

export default function MyApp({ Component, pageProps }: AppProps) {
  const { productCategories = [] } = useProductCategories();

  return (
    <CartContextProvider>
      <ChakraProvider theme={theme}>
        <Navbar categories={productCategories} />
        <Box mx="4" mt="4">
          <Component {...pageProps} />
        </Box>

        <Cart />
      </ChakraProvider>
    </CartContextProvider>
  );
}
