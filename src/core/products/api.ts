import { Product } from "./types";

const PRODUCTS: Product[] = [
  {
    id: "2",
    title: "Product 1 Product 1 Product 1 Product 1 Product 1 Product 1 ",
    price: 150,
    images: ["https://bit.ly/2Z4KKcF"],
    category: {
      id: "123",
      label: "sport",
    },
  },
  {
    id: "3",
    title: "Product 2",
    price: 250,
    images: ["https://bit.ly/2Z4KKcF"],
    category: {
      id: "12365676",
      label: "sport",
    },
  },
  {
    id: "4",
    title: "Product 3",
    price: 1034,
    images: ["https://bit.ly/2Z4KKcF"],
    category: {
      id: "1234",
      label: "sport",
    },
  },
  {
    id: "4",
    title: "Product 3",
    price: 1034,
    images: ["https://bit.ly/2Z4KKcF"],
    category: {
      id: "1234",
      label: "sport",
    },
  },
  {
    id: String(Math.random()),
    title: "Product 3",
    price: 1034,
    images: ["https://bit.ly/2Z4KKcF"],
    category: {
      id: "1234",
      label: "sport",
    },
  },
  {
    id: String(Math.random()),
    title: "Product 3",
    price: 1034,
    images: ["https://bit.ly/2Z4KKcF"],
    category: {
      id: "1234",
      label: "sport",
    },
  },
  {
    id: String(Math.random()),
    title: "Product 3",
    price: 1034,
    images: ["https://bit.ly/2Z4KKcF"],
    category: {
      id: "1234",
      label: "sport",
    },
  },
  {
    id: String(Math.random()),
    title: "Product 3",
    price: 1034,
    images: ["https://bit.ly/2Z4KKcF"],
    category: {
      id: "1234",
      label: "sport",
    },
  },
  {
    id: String(Math.random()),
    title: "Product 3",
    price: 1034,
    images: ["https://bit.ly/2Z4KKcF"],
    category: {
      id: "1234",
      label: "sport",
    },
  },
  {
    id: String(Math.random()),
    title: "Product 3",
    price: 1034,
    images: ["https://bit.ly/2Z4KKcF"],
    category: {
      id: "1234",
      label: "sport",
    },
  },
  {
    id: String(Math.random()),
    title: "Product 3",
    price: 1034,
    images: ["https://bit.ly/2Z4KKcF"],
    category: {
      id: "1234",
      label: "sport",
    },
  },
];

const ProductApi = {
  findById: (id: Product["id"]): Promise<Product | undefined> =>
    Promise.resolve(PRODUCTS.find((item) => item.id === id)),
  findByCategory: (categoryId: Product["category"]["id"]): Promise<Product[]> =>
    Promise.resolve(PRODUCTS),
  findNewest: (): Promise<Product[]> => Promise.resolve(PRODUCTS),
  remove: (id: Product["id"]): Promise<Product | undefined> =>
    Promise.resolve(PRODUCTS.find((item) => item.id === id)),
};

export default ProductApi;
