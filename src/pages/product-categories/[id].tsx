import type { NextPage } from "next";
import Head from "next/head";
import { Box, Text } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { product, productCategory } from "@prisma/client";

import { prisma } from "database";
import ProductList from "core/products/components/ProductList";

const ProductCategories: NextPage<{
  products: product[];
  categoryLabel: productCategory["label"];
}> = ({ products, categoryLabel }) => {
  return (
    <div>
      <Head>
        <title>{categoryLabel} | PriceShop</title>
        <meta
          name="description"
          content="Price-Shop, e-commerce app by José Núñez Riveros"
        />
      </Head>

      <Box as="main">
        <Text as="h1" fontSize="3xl" my="4" fontWeight="semibold">
          {categoryLabel}
        </Text>

        <ProductList products={products} />
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
  const responses = await Promise.allSettled([p1, p2]);

  const products =
    responses[0].status === "fulfilled" ? responses[0].value : [];

  const categoryLabel =
    responses[1].status === "fulfilled" && responses[1]?.value?.label
      ? responses[1].value.label
      : "Unknown product category";

  return { props: { products, categoryLabel } };
};

export default ProductCategories;
