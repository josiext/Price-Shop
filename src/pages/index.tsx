import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { Box, Text, Image, Badge, SimpleGrid } from "@chakra-ui/react";

const PRODUCTS = [
  {
    id: "2",
    title: "Product 1 Product 1 Product 1 Product 1 Product 1 Product 1 ",
    price: "150",
    image: "https://bit.ly/2Z4KKcF",
  },
  {
    id: "3",
    title: "Product 2",
    price: "250",
    image: "https://bit.ly/2Z4KKcF",
  },
  {
    id: "4",
    title: "Product 3",
    price: "1034",
    image: "https://bit.ly/2Z4KKcF",
  },
];

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Price-Shop</title>
        <meta
          name="description"
          content="Price-Shop, e-commerce app by José Núñez Riveros"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box as="main">
        <Text as="h1" fontSize="3xl" my="4" fontWeight="semibold">
          Highlights
        </Text>
        <SimpleGrid gap="4" minChildWidth="200px">
          {PRODUCTS.map((product) => (
            <Link href={`/product/${product.id}`} key={product.id}>
              <a>
                <Box
                  maxW="sm"
                  borderWidth="1px"
                  borderRadius="lg"
                  overflow="hidden"
                >
                  <Image src={product.image} alt={product.title} />
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

export default Home;
