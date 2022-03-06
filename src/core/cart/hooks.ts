import { product } from "@prisma/client";
import { useEffect, useState } from "react";

export const useCart = (productIds: product["id"][]) => {
  const [products, setProducts] = useState<product[]>([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const fetcher = async (id: product["id"]): Promise<product> => {
      const res = await fetch(`/api/product/${id}`);
      if (!res.ok) throw new Error();
      return res.json();
    };
    const requests = productIds.map(fetcher);
    const responses = await Promise.allSettled(requests);
    const data: product[] = [];
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
