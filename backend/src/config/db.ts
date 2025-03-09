import { DataSource } from "typeorm";
import { Ad } from "../entities/Ad";
import { Category } from "../entities/Category";
import { Tag } from "../entities/Tag";
import { Picture } from "../entities/Picture";
import "dotenv/config";

export const datasource = new DataSource({
  type: "postgres",
  database: process.env.DB_NAME as string,
  host: process.env.DB_HOST as string,
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER as string,
  password: process.env.DB_PASSWORD as string,
  entities: [Ad, Category, Tag, Picture],
  synchronize: true,
  logging: ["error", "query"],

});

// uninstall better-sqlite3
