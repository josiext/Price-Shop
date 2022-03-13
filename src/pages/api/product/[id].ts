import type { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "database";
import { Product } from "core/products/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Product | null>
) {
  try {
    if (req.method !== "GET" || typeof req.query.id !== "string")
      return res.status(404);
    const product = await prisma.product.findUnique({
      where: {
        id: req.query.id,
      },
    });

    return res.status(200).json(product);
  } catch (e) {
    console.error(e);
    return res.status(500);
  }
}
