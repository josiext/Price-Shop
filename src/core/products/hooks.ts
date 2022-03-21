import { useEffect, useState } from "react";

import { Product } from "./types";

const fetcher = async (search: string): Promise<Product[]> => {
  const res = await fetch(`/api/search-product?search=${search}`);
  if (!res.ok) return [];
  return res.json() as Promise<Product[]>;
};

export const useSearchProduct = () => {
  const [prev, setPrev] = useState<any>(null);
  const [showProductList, setShowProductList] = useState(false);
  const [products, setProducts] = useState<Product[] | []>([]);
  const [searchProduct, setSearchProduct] = useState<string>("");

  useEffect(() => {
    if (prev) clearTimeout(prev);

    if (!searchProduct) setShowProductList(false);
    else setShowProductList(true);

    const x = setTimeout(() => {
      fetcher(searchProduct).then(setProducts);
    }, 400);
    setPrev(x);
  }, [searchProduct]);

  return {
    search: searchProduct,
    productList: products,
    showProductList,
    setSearch: setSearchProduct,
    closeProductList: () => setShowProductList(false),
    openProductList: () => setShowProductList(true),
  };
};
