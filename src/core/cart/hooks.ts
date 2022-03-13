import { useEffect, useState } from "react";
import { product } from "@prisma/client";

const fetcher = async (id: product["id"]): Promise<product> => {
  const res = await fetch(`/api/product/${id}`);
  if (!res.ok) throw new Error();
  return res.json();
};

export const useCart = (productIds: product["id"][]) => {
  const [products, setProducts] = useState<product[]>([]);
  const [prevProducts, setPrevProducts] = useState<product["id"][]>([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (productIds.toString() !== prevProducts.toString()) {
      load();
      setPrevProducts(productIds);
    }
  }, [productIds, prevProducts]);

  const load = async () => {
    console.log("ejecuta aquí adentro");

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
