import useSWR from "swr";
import { productCategory } from "@prisma/client";

const fetcher = async (url: string): Promise<productCategory[]> => {
  const res = await fetch(url);
  if (!res.ok) throw new Error();
  const data = await res.json();
  return data;
};

export const useProductCategories = () => {
  const { data, error } = useSWR(`/api/product-categories`, fetcher);

  return {
    productCategories: data,
    isLoading: !error && !data,
    isError: error,
  };
};
