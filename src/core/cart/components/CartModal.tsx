import { useState } from "react";
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

import { Product } from "core/products/types";
import { useCartContext } from "../context";
import ProductPreviewCart from "core/products/components/ProductCartPreview";
import { useCart } from "../hooks";

const getItemAmount = (
  id: Product["id"],
  list: { id: Product["id"]; amount: number }[]
) => {
  return list.find((d) => d.id === id)?.amount ?? 0;
};

const Cart = () => {
  const toast = useToast();
  const [isBuying, setIsBuying] = useState<boolean>(false);
  const [Cart, CartActions] = useCartContext();
  const { products } = useCart(Cart.products.map((item) => item.id));

  const handleBuy = () => {
    setIsBuying(true);
    setTimeout(() => {
      toast({
        title: "Successful purchase",
        status: "success",
        isClosable: true,
      });
      CartActions.toggleCart();
      CartActions.removeAllProducts();
      setIsBuying(false);
    }, 800);
  };

  const getTotal = () => {
    const format = products.map(
      (item) =>
        item.price *
        (Cart.products.find((product) => product.id === item.id)?.amount ?? 1)
    );
    const total = format.reduce((acc, item) => item + acc, 0);
    return total;
  };

  return (
    <Modal isOpen={Cart.isOpen} onClose={CartActions.closeCart}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>My cart</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {products?.length ? (
            <VStack>
              {products.map((item) => (
                <ProductPreviewCart
                  key={item.id}
                  data={item}
                  onClick={CartActions.closeCart}
                  onDecreaseAmount={() => CartActions.decreaseAmount(item.id)}
                  amount={getItemAmount(item.id, Cart.products)}
                  onAddAmount={() => CartActions.addAmount(item.id)}
                  onRemove={() => CartActions.removeProduct(item.id)}
                />
              ))}
            </VStack>
          ) : (
            <Text color="gray.400">No products added to the cart</Text>
          )}

          <Box d="flex" justifyContent="space-between" mt="7">
            <Text fontSize="lg" fontWeight="semibold">
              Total
            </Text>
            <Text fontWeight="semibold">${getTotal()}</Text>
          </Box>
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="blue"
            mr={3}
            onClick={handleBuy}
            isDisabled={!products.length}
            isLoading={isBuying}
          >
            Buy
          </Button>
          <Button variant="ghost" onClick={CartActions.closeCart}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default Cart;
