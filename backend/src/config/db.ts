import { DataSource } from "typeorm";
import { Ad } from "../entities/Ad";
import { Category } from "../entities/Category";
import { Tag } from "../entities/Tag";
import { Picture } from "../entities/Picture";

export const datasource = new DataSource({
  type: "sqlite",
  database: "../../good_corner.sqlite",
  entities: [Ad, Category, Tag, Picture],
  synchronize: true,
  logging: ["error", "query"],
  // migrations: ["migrations/*.ts"],
  // migrationsTableName: "migrations",
});
