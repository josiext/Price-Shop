import { useEffect, useMemo, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  VStack,
  Text,
  Box,
} from "@chakra-ui/react";

import { useCart } from "core/cart/hooks";
import { Product } from "core/products/types";
import ProductApi from "core/products/api";
import Link from "next/link";

const Cart = ({ onBuy }: any) => {
  const Cart = useCart();
  const [items, setItems] = useState<Product[]>([]);

  useEffect(() => {
    getItems();
  }, [Cart.products]);

  const getItems = async () => {
    const promises = Cart.products.map((product) =>
      ProductApi.findById(product.id)
    );
    const responses = await Promise.allSettled(promises);

    const data: Product[] = [];
    const errors = [];
    responses.forEach((res) => {
      if (res.status === "fulfilled" && res.value) data.push(res.value);
      else errors.push(res);
    });

    setItems(data);
  };

  const totalPrice = useMemo(
    () =>
      items.reduce(
        (acc, item) =>
          acc +
          item.price *
            (Cart.products.find((d) => d.id === item.id)?.amount ?? 1),
        0
      ),
    [items]
  );

  return (
    <Modal isOpen={Cart.isOpen} onClose={Cart.toggleOpen}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>My cart</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {items?.length ? (
            <VStack>
              {items.map((item) => (
                <Box
                  key={item.id}
                  d="flex"
                  justifyContent="center"
                  alignItems="center"
                  gap="2"
                  w="full"
                >
                  <Link href={`/product/${item.id}`}>
                    <a onClick={Cart.toggleOpen} style={{ width: "100%" }}>
                      <Box
                        d="flex"
                        shadow="sm"
                        borderWidth="1px"
                        borderRadius="lg"
                        p="3"
                      >
                        <Text flex="3" fontWeight="semibold">
                          {item.title}
                        </Text>
                        <Text flex="1" d="grid" placeContent="center">
                          ${item.price}
                        </Text>
                      </Box>
                    </a>
                  </Link>
                  <Box flex="1" d="grid" placeContent="center">
                    <Box d="flex">
                      <Button onClick={() => Cart.decreaseAmount(item.id)}>
                        -
                      </Button>
                      <Text d="grid" placeContent="center">
                        {Cart.products.find((d) => d.id === item.id)?.amount}
                      </Text>
                      <Button onClick={() => Cart.addAmount(item.id)}>+</Button>
                    </Box>
                  </Box>

                  <Button onClick={() => Cart.removeProduct(item.id)}>X</Button>
                </Box>
              ))}
            </VStack>
          ) : (
            <Text color="gray.400">No products added to cart</Text>
          )}

          <Box d="flex" justifyContent="space-between" mt="7">
            <Text fontSize="lg" fontWeight="semibold">
              Total
            </Text>
            <Text fontWeight="semibold">{totalPrice}</Text>
          </Box>
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="blue"
            mr={3}
            onClick={onBuy}
            isDisabled={!items.length}
          >
            Buy
          </Button>
          <Button variant="ghost" onClick={Cart.toggleOpen}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default Cart;
