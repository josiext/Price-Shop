import type { NextApiRequest, NextApiResponse } from "next";

const PRODUCTS: any = {
  id: "2",
  title: "Product 1",
  price: 150,
  images: ["https://bit.ly/2Z4KKcF"],
  category: {
    id: "123",
    label: "sport",
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<typeof PRODUCTS>
) {
  if (req.method === "GET") return res.status(200).json(PRODUCTS);
  if (req.method === "POST") return res.status(200).json(PRODUCTS);
  if (req.method === "DELETE") return res.status(200).json(PRODUCTS);
  if (req.method === "PATCH") return res.status(200).json(PRODUCTS);
  return res.status(404);
}
