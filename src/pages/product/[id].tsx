import type { GetServerSideProps, NextPage } from "next";
import { useMemo } from "react";
import Head from "next/head";
import { Box, useToast } from "@chakra-ui/react";

import { Product as IProduct } from "core/products/types";
import ProductApi from "core/products/api";
import { useCartContext } from "core/cart/context";
import ProductView from "core/products/components/ProductView";

const Product: NextPage<{ product: IProduct }> = ({ product }) => {
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
        <title>{product.title} | PriceShop</title>
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
  const productId = query.id as IProduct["category"]["id"];
  const product = await ProductApi.findById(productId);
  return { props: { product } };
};

export default Product;
