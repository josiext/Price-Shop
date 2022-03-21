import React from "react";
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
  Flex,
  Link as ChakraLink,
} from "@chakra-ui/react";
import Link from "next/link";
import { productCategory } from "@prisma/client";

import Icon from "ui/icon";
import { COLORS } from "theme";
import { useCartContext } from "core/cart/context";
import { useSearchProduct } from "core/products/hooks";

export interface NavbarProps {
  categories: productCategory[];
}

export default function Navbar({ categories }: NavbarProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [_, CartActions] = useCartContext();

  const {
    search,
    productList,
    showProductList,
    setSearch,
    closeProductList,
    openProductList,
  } = useSearchProduct();

  return (
    <>
      <Box as="nav" bg="primary" p="4">
        <Flex d="flex" justifyContent="space-between" mx="auto" maxW="1400px">
          <HStack gap="4">
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

          <Button
            onClick={CartActions.toggleCart}
            p="2"
            variant="unstyled"
            d="flex"
            gap="1"
          >
            <Icon name="cart" color={COLORS.SECONDARY} width="35px" />
            <Text
              color="#fff"
              h="full"
              d="flex"
              flexDir="column-reverse"
              fontSize="lg"
            >
              Cart
            </Text>
          </Button>
        </Flex>
      </Box>

      <Box bg="primary" p={4}>
        <Box
          position="relative"
          d="flex"
          flexDir="column"
          maxW="1400px"
          mx="auto"
          onMouseLeave={closeProductList}
        >
          <Input
            placeholder="Search..."
            bg="#fff"
            maxW="full"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            onClick={() => search && openProductList()}
            onMouseEnter={() => search && openProductList()}
          />

          {showProductList && (
            <Box
              position="absolute"
              borderWidth="1px"
              top="41px"
              width="full"
              bg="white"
              p="4"
              borderRadius="md"
              zIndex="modal"
            >
              {productList?.length > 0 ? (
                productList.map((product) => (
                  <Box
                    key={product.id}
                    onClick={() => {
                      closeProductList();
                      setSearch("");
                    }}
                    _hover={{ backgroundColor: "#f8f8f8" }}
                  >
                    <Link href={`/product/${product.id}`} passHref>
                      <ChakraLink d="block" p="1">
                        {product.name}
                      </ChakraLink>
                    </Link>
                  </Box>
                ))
              ) : (
                <Text color="gray.400" textAlign="center">
                  No products to show
                </Text>
              )}
            </Box>
          )}
        </Box>
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
