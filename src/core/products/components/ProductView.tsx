import Image from "next/image";
import { Box, Button, Container, Text } from "@chakra-ui/react";

import { DEFAULT_PROUDUCT_IMAGE } from "utils/images";
import { Product } from "../types";

export interface ProductViewProps {
  data: Product;
  isInCart: boolean;
  onAddToCart: () => void;
  onRemoveFromCart: () => void;
}

export default function ProductView({
  data,
  isInCart,
  onAddToCart,
  onRemoveFromCart,
}: ProductViewProps) {
  return (
    <Box>
      <Text mb="2" fontSize="sm" color="gray">
        {data.id}
      </Text>

      <Image
        src={data.images[0] || DEFAULT_PROUDUCT_IMAGE}
        alt={data.name}
        width="400px"
        height="400px"
        objectFit="contain"
      />
      <Text fontSize="2xl" fontWeight="semibold">
        {data.name}
      </Text>
      <Container m="0" p="0" mt="2">
        {data.description}
      </Container>

      <Text mt="2" fontSize="lg" fontWeight="semibold">
        ${data.price}
      </Text>

      {isInCart ? (
        <Button
          mt="4"
          bg="red.500"
          color="whiteAlpha.900"
          onClick={onRemoveFromCart}
        >
          Remove from cart
        </Button>
      ) : (
        <Button mt="4" bg="secondary" onClick={onAddToCart}>
          Add to cart
        </Button>
      )}
    </Box>
  );
}
