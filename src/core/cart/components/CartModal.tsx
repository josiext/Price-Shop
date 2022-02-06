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
  useToast,
} from "@chakra-ui/react";
import Link from "next/link";

import { Product } from "core/products/types";
import ProductApi from "core/products/api";
import { useCartContext } from "../context";

export interface CartProps {
  isOpen: boolean;
  toggleCart: () => void;
}

const Cart = ({ isOpen, toggleCart }: CartProps) => {
  const toast = useToast();
  const [items, setItems] = useState<Product[]>([]);
  const [isBuying, setIsBuying] = useState<boolean>(false);

  const [Cart, CartActions] = useCartContext();

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

  const handleBuy = () => {
    setIsBuying(true);
    setTimeout(() => {
      toast({
        title: "Successful purchase",
        status: "success",
        isClosable: true,
      });
      toggleCart();
      CartActions.removeAllProducts();
      setIsBuying(false);
    }, 800);
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
    [items, Cart.products]
  );

  return (
    <Modal isOpen={isOpen} onClose={toggleCart}>
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
                    <a
                      onClick={CartActions.closeCart}
                      style={{ width: "100%" }}
                    >
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
                      <Button
                        onClick={() => CartActions.decreaseAmount(item.id)}
                      >
                        -
                      </Button>
                      <Text d="grid" placeContent="center">
                        {Cart.products.find((d) => d.id === item.id)?.amount}
                      </Text>
                      <Button onClick={() => CartActions.addAmount(item.id)}>
                        +
                      </Button>
                    </Box>
                  </Box>

                  <Button onClick={() => CartActions.removeProduct(item.id)}>
                    X
                  </Button>
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
            <Text fontWeight="semibold">${totalPrice}</Text>
          </Box>
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="blue"
            mr={3}
            onClick={handleBuy}
            isDisabled={!items.length}
            isLoading={isBuying}
          >
            Buy
          </Button>
          <Button variant="ghost" onClick={toggleCart}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default Cart;
