import type { NextPage } from "next";
import { SimpleGrid } from "@chakra-ui/react";
import Link from "next/link";

import { Product } from "core/products/types";
import ProductPreview from "core/products/components/ProductPreview";

interface ProductListProps {
  products: Product[];
}

const ProductList: NextPage<ProductListProps> = ({ products }) => {
  return (
    <SimpleGrid minChildWidth="240px" spacing="20px">
      {products?.map((product) => (
        <Link href={`/product/${product.id}`} key={product.id}>
          <a>
            <ProductPreview data={product} />
          </a>
        </Link>
      ))}
    </SimpleGrid>
  );
};

export default ProductList;
