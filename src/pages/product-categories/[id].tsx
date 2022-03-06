import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { Box, Text, Image, Badge, SimpleGrid } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { product, productCategory } from "@prisma/client";

import { prisma } from "database";

const ProductCategories: NextPage<{
  products: product[];
  category: productCategory;
}> = ({ products, category }) => {
  return (
    <div>
      <Head>
        <title>{category.label} | PriceShop</title>
        <meta
          name="description"
          content="Price-Shop, e-commerce app by José Núñez Riveros"
        />
      </Head>

      <Box as="main">
        <Text as="h1" fontSize="3xl" my="4" fontWeight="semibold">
          {category.label}
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
                  <Image src={product.images[0]} alt={product.name} />
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
                      {product.name}
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
  const categoryId = query.id as productCategory["id"];

  const p1 = prisma.product.findMany({
    where: { idCategory: categoryId },
  });
  const p2 = prisma.productCategory.findUnique({
    where: { id: categoryId },
  });
  const [products, category] = await Promise.all([p1, p2]);

  return { props: { products, category } };
};

export default ProductCategories;
