import "reflect-metadata";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { datasource } from "./config/db";
import { buildSchema } from "type-graphql";
import AdResolver from "./resolvers/AdResolver";

const start = async () => {
  await datasource.initialize();

  const schema = await buildSchema({
    resolvers: [AdResolver],
    // resolvers: [AdResolver, CategoryResolver, TagResolver],
  });

  const server = new ApolloServer({
    schema,
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });

  console.log(`🚀  Server ready at: ${url}`);
};

start();
