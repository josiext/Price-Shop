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
  VStack,
} from "@chakra-ui/react";
import Link from "next/link";

const PRODUCT_CATEGORIES = [
  {
    label: "sports",
    id: "123",
  },
  {
    label: "room",
    id: "45439",
  },
];

export interface NavbarProps {
  toggleCart: () => void;
}

export default function Navbar({ toggleCart }: NavbarProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box as="nav" bg="#f8f8f8" d="flex" justifyContent="space-between" p="5">
        <Button colorScheme="teal" onClick={onOpen}>
          Menu
        </Button>
        <Link href="/">
          <a>PriceShop</a>
        </Link>
        <Input placeholder="Search.." />
        <Button onClick={toggleCart}>Cart</Button>
      </Box>

      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Categories</DrawerHeader>

          <DrawerBody>
            <VStack alignItems="left">
              {PRODUCT_CATEGORIES.map((item) => (
                <Link key={item.id} href={`/product-categories/${item.id}`}>
                  <a onClick={onClose}>
                    <Text fontSize="lg">{item.label}</Text>
                  </a>
                </Link>
              ))}
            </VStack>
          </DrawerBody>

          <DrawerFooter>PriceShop</DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
