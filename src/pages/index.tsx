import type { NextPage } from "next";
import { Box, Heading, SimpleGrid } from "@chakra-ui/react";
import Head from "next/head";
import Link from "next/link";

import { prisma } from "database";
import { Product } from "core/products/types";
import ProductPreview from "core/products/components/ProductPreview";

interface HomeProps {
  products: Product[];
}

const Home: NextPage<HomeProps> = ({ products }) => {
  console.log("products", products);

  return (
    <>
      <Head>
        <title>PriceShop</title>
        <meta
          name="description"
          content="PriceShop, e-commerce app by José Núñez Riveros"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box minW="100%" overflow="auto" d="flex" justifyContent="center">
        <Box
          as="main"
          w="full"
          maxW="1600px"
          overflow="auto"
          d="flex"
          flexDir="column"
          justifyContent="center"
        >
          <Heading as="h2" my="7" fontWeight="semibold">
            Highlights
          </Heading>
          <SimpleGrid minChildWidth="240px" spacing="20px">
            {products?.map((product) => (
              <Link href={`/product/${product.id}`} key={product.id}>
                <a>
                  <ProductPreview data={product} />
                </a>
              </Link>
            ))}
          </SimpleGrid>
        </Box>
      </Box>
    </>
  );
};

export const getServerSideProps = async () => {
  const products = await prisma.product.findMany();
  return { props: { products } };
};

export default Home;
