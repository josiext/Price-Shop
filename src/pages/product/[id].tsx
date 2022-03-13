import type { GetServerSideProps, NextPage } from "next";
import { useMemo } from "react";
import Head from "next/head";
import { Box, useToast } from "@chakra-ui/react";

import { prisma } from "database";
import { useCartContext } from "core/cart/context";
import ProductView from "core/products/components/ProductView";
import { Product as IProduct } from "core/products/types";

export interface ProductProps {
  product: IProduct;
}

const Product: NextPage<ProductProps> = ({ product }) => {
  const toast = useToast();

  const [Cart, CartActions] = useCartContext();

  const handleAddToCart = () => {
    CartActions.addProduct(product.id);
    toast({
      title: "Added to cart",
      description: "product was added to cart.",
      status: "success",
      duration: 1000,
    });
  };

  const handleRemoveFromCart = () => {
    CartActions.removeProduct(product.id);
    toast({
      title: "Removed from cart",
      description: "product was removed from cart.",
      status: "success",
      duration: 1000,
    });
  };

  const isProductInCart = useMemo(
    () => Boolean(Cart.products.find((item) => item.id === product.id)),
    [product, Cart.products]
  );

  return (
    <Box>
      <Head>
        <title>{product.name} | PriceShop</title>
        <meta
          name="description"
          content="PriceShop, e-commerce app by José Núñez Riveros"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ProductView
        data={product}
        isInCart={isProductInCart}
        onAddToCart={handleAddToCart}
        onRemoveFromCart={handleRemoveFromCart}
      />
    </Box>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const productId = query.id as IProduct["id"];
  const product = await prisma.product.findUnique({
    where: {
      id: productId,
    },
  });

  return { props: { product } };
};

export default Product;
