import React, { useEffect, useRef, useState } from "react";
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
} from "@chakra-ui/react";
import Link from "next/link";
import { product, productCategory } from "@prisma/client";

import Icon from "ui/icon";
import { COLORS } from "theme";
import { useCartContext } from "core/cart/context";
import { Product } from "core/products/types";

export interface NavbarProps {
  categories: productCategory[];
}

const fetcher = async (search: string): Promise<Product[]> => {
  const res = await fetch(`/api/search-product?search=${search}`);
  if (!res.ok) return [];
  return res.json() as Promise<Product[]>;
};

export default function Navbar({ categories }: NavbarProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [_, CartActions] = useCartContext();
  const [searchProduct, setSearchProduct] = useState<string>("");
  const [products, setProducts] = useState<product[] | []>([]);
  const [showProductList, setShowProductList] = useState(false);
  const productListEl = useRef<HTMLDivElement | null>(null);
  const inputSearchEl = useRef<HTMLInputElement | null>(null);

  const [prev, setPrev] = useState<any>(null);

  useEffect(() => {
    window.addEventListener("mousedown", handleClose);

    return () => window.removeEventListener("mousedown", handleClose);
  }, []);

  useEffect(() => {
    // TODO mover a custom hook

    if (prev) clearTimeout(prev);
    if (!searchProduct && showProductList === true) setShowProductList(false);
    else setShowProductList(true);

    const x = setTimeout(() => {
      fetcher(searchProduct).then(setProducts);
    }, 600);
    setPrev(x);
  }, [searchProduct]);

  const handleClose = (e: any) => {
    if (
      !productListEl?.current?.isSameNode(e.target) &&
      !inputSearchEl?.current?.isSameNode(e.target)
    ) {
      setShowProductList(false);
    }
  };

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
        <Flex position="relative" flexDir="column" w="full">
          <Input
            ref={inputSearchEl}
            placeholder="Search.."
            bg="#fff"
            maxW="full"
            onChange={(e) => setSearchProduct(e.target.value)}
            value={searchProduct}
            onClick={() => searchProduct && setShowProductList(true)}
          />
          {showProductList && (
            <Box
              ref={productListEl}
              position="absolute"
              borderWidth="1px"
              top="41px"
              width="full"
              bg="white"
              p="4"
              borderRadius="md"
            >
              {products && products?.length > 0 ? (
                products.map((product) => (
                  <Box key={product.id}>{product.name}</Box>
                ))
              ) : (
                <Text color="gray.400" textAlign="center">
                  No products to show
                </Text>
              )}
            </Box>
          )}
        </Flex>

        <Button
          onClick={CartActions.toggleCart}
          p="2"
          variant="unstyled"
          d="flex"
          gap="1"
        >
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
