import type { NextApiRequest, NextApiResponse } from "next";
import { Sequelize, DataTypes } from "sequelize";

import { Product } from "core/products/types";
import { getDB } from "database";

const DatabaseConn = getDB();

const User = DatabaseConn.define(
  "User",
  {
    // Model attributes are defined here
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      // allowNull defaults to true
    },
  },
  {
    // Other model options go here
  }
);

// `sequelize.define` also returns the model
console.log(User === DatabaseConn.models.User); // true

const PRODUCTS: Product = {
  id: "2",
  title: "Product 1 Product 1 Product 1 Product 1 Product 1 Product 1 ",
  price: 150,
  images: ["https://bit.ly/2Z4KKcF"],
  category: {
    id: "123",
    label: "sport",
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Product>
) {
  console.log(await User.findAll());

  if (req.method === "GET") return res.status(200).json(PRODUCTS);
  if (req.method === "POST") return res.status(200).json(PRODUCTS);
  if (req.method === "DELETE") return res.status(200).json(PRODUCTS);
  if (req.method === "PATCH") return res.status(200).json(PRODUCTS);
  return res.status(404);
}
