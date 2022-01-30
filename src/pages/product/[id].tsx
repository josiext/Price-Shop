import type { GetServerSideProps, NextPage } from "next";
import { useMemo } from "react";
import Head from "next/head";
import Image from "next/image";
import { Box, Button, Container, Text, useToast } from "@chakra-ui/react";

import { Product as IProduct } from "core/products/types";
import ProductApi from "core/products/api";
import { useCart } from "core/products/hooks";

const Product: NextPage<{ product: IProduct }> = ({ product }) => {
  const toast = useToast();
  const { products, addProduct, removeProduct } = useCart();

  const handleAddToCart = () => {
    addProduct(product.id);
    toast({
      title: "Added to cart",
      description: "product was added to cart.",
      status: "success",
      duration: 1000,
    });
  };

  const handleRemoveFromCart = () => {
    removeProduct(product.id);
    toast({
      title: "Removed from cart",
      description: "product was removed from cart.",
      status: "success",
      duration: 1000,
    });
  };

  const isProductInCart = useMemo(
    () => products.includes(product.id),
    [product, products]
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
      <Text mb="2" fontSize="sm" color="gray">
        Product id: {product.id}
      </Text>

      <Image
        src={product.images[0]}
        alt={product.title}
        width="400px"
        height="400px"
      />
      <Text fontSize="2xl" fontWeight="semibold">
        {product.title}
      </Text>
      <Container m="0" p="0" mt="2">
        {product.description}
      </Container>

      <Text mt="2" fontSize="lg" fontWeight="semibold">
        ${product.price}
      </Text>

      {isProductInCart ? (
        <Button mt="4" onClick={handleRemoveFromCart}>
          Remove from cart
        </Button>
      ) : (
        <Button mt="4" onClick={handleAddToCart}>
          Add to cart
        </Button>
      )}
    </Box>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const productId = query.id as IProduct["category"]["id"];
  const product = await ProductApi.findById(productId);
  return { props: { product } };
};

export default Product;
