import type { NextPage } from "next";
import { SimpleGrid } from "@chakra-ui/react";
import Link from "next/link";

import { Product } from "core/products/types";
import ProductPreview from "core/products/components/ProductPreview";

export interface ProductListProps {
  products: Product[];
}

const ProductList: NextPage<ProductListProps> = ({ products }) => {
  return (
    <SimpleGrid columns={[1, 2, 3, 4]} spacing={"10px"}>
      {products?.map((product) => (
        <Link href={`/product/${product.id}`} key={product.id}>
          <a>
            <ProductPreview data={product} maxWidth="350px" />
          </a>
        </Link>
      ))}
    </SimpleGrid>
  );
};

export default ProductList;
