import type { NextPage } from "next";
import { Grid } from "@chakra-ui/react";
import Link from "next/link";

import { Product } from "core/products/types";
import ProductPreview from "core/products/components/ProductPreview";

export interface ProductListProps {
  products: Product[];
}

const ProductList: NextPage<ProductListProps> = ({ products }) => {
  return (
    <Grid templateColumns="repeat(auto-fill, minmax(300px, 1fr))" gap="40px">
      {products?.map((product) => (
        <Link href={`/product/${product.id}`} key={product.id}>
          <a>
            <ProductPreview data={product} maxWidth="450px" />
          </a>
        </Link>
      ))}
    </Grid>
  );
};

export default ProductList;
