import type { NextPage } from "next";
import { Box, Image, Badge, SimpleGrid, Heading, Grid } from "@chakra-ui/react";
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

      <Box as="main" mx="250px">
        <Heading as="h2" my="7" fontWeight="semibold">
          Highlightss
        </Heading>
        <Grid templateColumns="repeat(3,auto)" gap="4" bg="red">
          {products?.map((product) => (
            <Link href={`/product/${product.id}`} key={product.id}>
              <a>
                <Box
                  borderWidth="1px"
                  borderRadius="lg"
                  overflow="hidden"
                  shadow="base"
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
        </Grid>
      </Box>
    </div>
  );
};

export async function getServerSideProps() {
  const products = await ProductApi.findNewest();
  return { props: { products } };
}

export default Home;
