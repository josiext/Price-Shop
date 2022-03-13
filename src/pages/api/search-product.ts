import type { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "database";
import { Product } from "core/products/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Product[] | { message: string }>
) {
  try {
    if (req.method !== "GET")
      return res.status(404).send({ message: "Api doesn't exists" });

    const textToSearch = req.query.search;
    if (typeof textToSearch !== "string")
      return res.status(400).send({ message: "Bad query" });

    const product = await prisma.product.findMany({
      where: {
        name: {
          contains: textToSearch,
        },
      },
    });
    return res.status(200).json(product);
  } catch (e: any) {
    console.error(e);
    return res.status(500).send({ message: e?.message || "Unknown error" });
  }
}
