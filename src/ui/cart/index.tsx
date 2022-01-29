import { useContext, createContext, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Box,
  Text,
  Button,
} from "@chakra-ui/react";

export const CartContext = createContext({ isOpen: false });

const Cart = ({ onClose, onBuy }: any) => {
  const { isOpen } = useContext(CartContext);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Modal Title</ModalHeader>
        <ModalCloseButton />
        <ModalBody>Productos...</ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onBuy}>
            Comprar
          </Button>
          <Button variant="ghost">Cerrar</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default Cart;
