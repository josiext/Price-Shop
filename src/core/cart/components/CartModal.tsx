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

import { Product } from "core/products/types";
import ProductApi from "core/products/api";
import { useCartContext } from "../context";
import ProductPreviewCart from "core/products/components/ProductCartPreview";

export interface CartProps {
  isOpen: boolean;
  toggleCart: () => void;
}

const getTotalItemPrice = (
  items: Product[],
  itemAmount: { id: Product["id"]; amount: number }[]
) => {
  return items.reduce(
    (acc, item) => acc + item.price * getItemAmount(item.id, itemAmount),
    0
  );
};

const getItemAmount = (
  id: Product["id"],
  list: { id: Product["id"]; amount: number }[]
) => {
  return list.find((d) => d.id === id)?.amount ?? 0;
};

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
    () => getTotalItemPrice(items, Cart.products),
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
                <ProductPreviewCart
                  key={item.id}
                  data={item}
                  onClick={() => CartActions.closeCart()}
                  onDecreaseAmount={() => CartActions.decreaseAmount(item.id)}
                  amount={getItemAmount(item.id, Cart.products)}
                  onAddAmount={() => CartActions.addAmount(item.id)}
                  onRemove={() => CartActions.removeProduct(item.id)}
                />
              ))}
            </VStack>
          ) : (
            <Text color="gray.400">No products added to this cart</Text>
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
