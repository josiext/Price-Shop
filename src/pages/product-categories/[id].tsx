import type { NextPage } from "next";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import { Box, Text, Image, Badge, SimpleGrid } from "@chakra-ui/react";
import { GetServerSideProps } from "next";

import ProductApi from "core/products/api";
import { Product } from "core/products/types";

const ProductCategories: NextPage<{ products: Product[] }> = ({ products }) => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div>
      <Head>
        <title>{id} | PriceShop</title>
        <meta
          name="description"
          content="Price-Shop, e-commerce app by José Núñez Riveros"
        />
      </Head>

      <Box as="main">
        <Text as="h1" fontSize="3xl" my="4" fontWeight="semibold">
          {id}
        </Text>
        <SimpleGrid gap="4" minChildWidth="200px">
          {products.map((product) => (
            <Link href={`/product/${product.id}`} key={product.id}>
              <a>
                <Box
                  maxW="sm"
                  borderWidth="1px"
                  borderRadius="lg"
                  overflow="hidden"
                >
                  <Image src={product.images[0]} alt={product.title} />
                  <Box p="6">
                    <Box display="flex" alignItems="baseline">
                      <Badge borderRadius="full" px="2" colorScheme="teal">
                        New
                      </Badge>
                    </Box>

                    <Box
                      mt="1"
                      fontWeight="semibold"
                      as="h4"
                      lineHeight="tight"
                      isTruncated
                    >
                      {product.title}
                    </Box>

                    <Box>{product.price} usd</Box>
                  </Box>
                </Box>
              </a>
            </Link>
          ))}
        </SimpleGrid>
      </Box>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const categoryId = query.id as Product["category"]["id"];
  const products = await ProductApi.findByCategory(categoryId);
  return { props: { products } };
};

export default ProductCategories;
