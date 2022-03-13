import { useEffect, useState } from "react";

import { Product } from "core/products/types";

const fetcher = async (id: Product["id"]): Promise<Product> => {
  const res = await fetch(`/api/product/${id}`);
  if (!res.ok) throw new Error();
  return res.json();
};

export const useCart = (productIds: Product["id"][]) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [prevProducts, setPrevProducts] = useState<Product["id"][]>([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (productIds.toString() !== prevProducts.toString()) {
      load();
      setPrevProducts(productIds);
    }
  }, [productIds, prevProducts]);

  const load = async () => {
    const requests = productIds.map(fetcher);
    const responses = await Promise.allSettled(requests);
    const data: Product[] = [];
    responses.forEach(
      (item) =>
        item.status === "fulfilled" && item.value && data.push(item.value)
    );
    setProducts(data);
  };

  return {
    products,
    isLoading: !error && !products,
    isError: error,
  };
};
