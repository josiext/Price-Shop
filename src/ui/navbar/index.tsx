import { useRef } from "react";
import {
  Box,
  Button,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Input,
  Text,
} from "@chakra-ui/react";

export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box as="nav" bg="#f8f8f8" d="flex" justifyContent="space-between" p="5">
        <Button colorScheme="teal" onClick={onOpen}>
          Menu
        </Button>
        <Button>PriceShop</Button>
        <Input placeholder="Search.." />
        <Button>Cart</Button>
      </Box>

      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Productos</DrawerHeader>

          <DrawerBody>
            <Text>Drawer</Text>
          </DrawerBody>

          <DrawerFooter>PriceShop</DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
