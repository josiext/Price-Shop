import type { NextApiRequest, NextApiResponse } from "next";
import { product } from "@prisma/client";

import { prisma } from "database";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<product | null>
) {
  if (req.method !== "GET" || typeof req.query.id !== "string")
    return res.status(404);

  const product = await prisma.product.findUnique({
    where: {
      id: req.query.id,
    },
  });

  return res.status(200).json(product);
}
