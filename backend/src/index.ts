import "reflect-metadata";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { datasource } from "./config/db";
import { buildSchema } from "type-graphql";
import AdResolver from "./resolvers/AdResolver";
import CategoryResolver from "./resolvers/CategoryResolver";
import TagResolver from "./resolvers/TagResolver";
import UserResolver from "./resolvers/UserResolver";
import "dotenv/config";
import jwt, { Secret } from "jsonwebtoken";
import * as cookie from "cookie";

const start = async () => {
  if (!process.env.JWT_SECRET_KEY) {
    throw new Error("JWT_SECRET_KEY manquant dans .env");
  }
  await datasource.initialize();

  const schema = await buildSchema({
    resolvers: [AdResolver, CategoryResolver, TagResolver, UserResolver],

    authChecker: ({ context }) => {
      return !!context.email; // Retourne true si l'email existe, sinon false
    },
  });

  const server = new ApolloServer({
    schema,
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async ({ req, res }) => {
      if (req.headers.cookie) {
        const cookies = cookie.parse(req.headers.cookie as string);
        console.log("Cookies in Headers ===> ", cookies);
        if (cookies.token !== undefined) {
          try {
            const payload: any = jwt.verify(
              cookies.token,
              process.env.JWT_SECRET_KEY as Secret
            );
            console.log("payload in context", payload);
            if (payload) {
              console.log("payload was found and returned to resolver");
              return { email: payload.email, res };
            }
          } catch (error) {
            console.error("JWT verification failed: ", error);
          }
        }
      }
      return { res };
    },
  });

  console.log(`🚀 Server ready at: ${url}`);
};

start();
