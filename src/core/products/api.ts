import { Product } from "./types";
import { API } from "configs";

const findByCategory = async (
  categoryId: Product["category"]["id"]
): Promise<Product[]> => {
  const res = await fetch(`${API.BASE_URL}/products`);
  if (res.ok) return res.json();
  else return [];
};

const findNewest = async (): Promise<Product[]> => {
  const res = await fetch(`${API.BASE_URL}/products`);
  if (res.ok) return res.json();
  else return [];
};

const findById = async (id: Product["id"]): Promise<Product | null> => {
  const res = await fetch(`${API.BASE_URL}/product?id=${id}`);
  if (res.ok) return res.json();
  else return null;
};

const remove = async (id: Product["id"]): Promise<Product | null> => {
  const res = await fetch(`${API.BASE_URL}/product?id=${id}`, {
    method: "DELETE",
  });
  if (res.ok) return res.json();
  else return null;
};

const ProductApi = {
  findById,
  findByCategory,
  findNewest,
  remove,
};

export default ProductApi;
