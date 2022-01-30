import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";

import { useCart } from "core/products/hooks";

const Cart = ({ onBuy }: any) => {
  const { isOpen, toggleOpen } = useCart();

  return (
    <Modal isOpen={isOpen} onClose={toggleOpen}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Modal Title</ModalHeader>
        <ModalCloseButton />
        <ModalBody>Productos...</ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onBuy}>
            Comprar
          </Button>
          <Button variant="ghost" onClick={toggleOpen}>
            Cerrar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default Cart;
