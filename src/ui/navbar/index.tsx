import {
  Box,
  Button,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Input,
  Text,
  VStack,
  Heading,
  HStack,
} from "@chakra-ui/react";
import Link from "next/link";
import { productCategory } from "@prisma/client";

import Icon from "ui/icon";
import { COLORS } from "theme";

export interface NavbarProps {
  toggleCart: () => void;
  categories: productCategory[];
}

export default function Navbar({ toggleCart, categories }: NavbarProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box as="nav" bg="primary" d="flex" justifyContent="space-between" p="5">
        <HStack>
          <Button onClick={onOpen} variant="unstyled" p="2">
            <Icon name="menu" color="#fff" />
          </Button>
          <Link href="/">
            <a>
              <Heading color="#fff" as="h1">
                PriceShop
              </Heading>
            </a>
          </Link>
        </HStack>
        <Input placeholder="Search.." bg="#fff" maxW="600px" />
        <Button onClick={toggleCart} p="2" variant="unstyled" d="flex" gap="1">
          <Icon name="cart" color={COLORS.SECONDARY} width="35px" />
          <Text color="#fff" h="full" d="flex" flexDir="column-reverse">
            Cart
          </Text>
        </Button>
      </Box>

      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton color="#fff" />
          <DrawerHeader bg={COLORS.PRIMARY}>
            <Heading as="h2" fontWeight="semibold" color="#fff">
              Categories
            </Heading>
          </DrawerHeader>

          <DrawerBody>
            <VStack alignItems="left">
              {categories.map((item) => (
                <Link key={item.id} href={`/product-categories/${item.id}`}>
                  <a onClick={onClose}>
                    <Text fontSize="2xl" fontWeight="semibold">
                      {item.label}
                    </Text>
                  </a>
                </Link>
              ))}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
