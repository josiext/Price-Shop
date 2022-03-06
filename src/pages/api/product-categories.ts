import type { NextApiRequest, NextApiResponse } from "next";
import { productCategory } from "@prisma/client";

import { prisma } from "database";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<productCategory[]>
) {
  if (req.method !== "GET") return res.status(404);
  const categories = await prisma.productCategory.findMany();
  return res.status(200).json(categories);
}
