import type { NextPage } from "next";
import { useRouter } from "next/router";
import { Box, Button, Container, Text } from "@chakra-ui/react";
import Image from "next/image";

const PRODUCT = {
  id: "2",
  title: "Product 1 Product 1 Product 1 Product 1 Product 1 Product 1 ",
  description:
    "description 1 description 1 description 1 description 1 description 1 description 1 ",
  price: "150",
  image: "https://bit.ly/2Z4KKcF",
};

const Product: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <Box>
      <Text mb="2" fontSize="sm" color="gray">
        Product id: {id}
      </Text>

      <Image
        src={PRODUCT.image}
        alt={PRODUCT.title}
        width="400px"
        height="400px"
      />
      <Text fontSize="2xl" fontWeight="semibold">
        {PRODUCT.title}
      </Text>
      <Container m="0" p="0" mt="2">
        {PRODUCT.description}
      </Container>

      <Text mt="2" fontSize="lg" fontWeight="semibold">
        ${PRODUCT.price}
      </Text>

      <Button mt="4">Add to cart</Button>
    </Box>
  );
};

export default Product;
