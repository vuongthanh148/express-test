import dotenv from "dotenv";
import { Sequelize } from "sequelize";

dotenv.config();

const schema = process.env.DB_SCHEMA as string;
const username = process.env.DB_USERNAME as string;
const password = process.env.DB_PASSWORD as string;
const host = process.env.DB_HOST as string;
const dialect = process.env.DB_DIALECT as any;

const sequelize = new Sequelize(schema, username, password, {
  host: host,
  dialect: dialect,
});
sequelize
  .authenticate()
  .then(() => console.log(`connect datasource success`))
  .catch((e: any) => console.log(`datasource failed`, e));

export default sequelize;
