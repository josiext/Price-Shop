import type { NextApiRequest, NextApiResponse } from "next";

import { Product } from "core/products/types";

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

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Product[]>
) {
  if (req.method === "GET") return res.status(200).json(PRODUCTS);
  return res.status(404);
}
