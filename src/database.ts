import { Sequelize } from "sequelize";

const DB_URI = "postgres://postgres:1234@localhost:5432/priceshop";

let DatabaseConn: Sequelize | undefined;

const getDB = (): Sequelize => {
  if (!DatabaseConn) {
    DatabaseConn = new Sequelize(DB_URI);
  }
  return DatabaseConn;
};

export { getDB };
