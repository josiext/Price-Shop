import type { NextPage } from "next";
import { Box, Text, Image, Badge, SimpleGrid } from "@chakra-ui/react";
import Head from "next/head";
import Link from "next/link";

import { Product } from "core/products/types";
import ProductApi from "core/products/api";

interface HomeProps {
  products: Product[];
}

const Home: NextPage<HomeProps> = ({ products }) => {
  return (
    <div>
      <Head>
        <title>PriceShop</title>
        <meta
          name="description"
          content="PriceShop, e-commerce app by José Núñez Riveros"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box as="main">
        <Text as="h1" fontSize="3xl" my="4" fontWeight="semibold">
          Highlights
        </Text>
        <SimpleGrid gap="4" minChildWidth="200px">
          {products?.map((product) => (
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

export async function getServerSideProps() {
  const products = await ProductApi.findNewest();
  return { props: { products } };
}

export default Home;
