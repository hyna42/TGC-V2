import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  // schema: "http://localhost:4000",
  schema: "http://backend:4000",
  documents: ["src/graphql/*.ts"],
  generates: {
    "./src/generated/graphql-types.ts": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-apollo",
      ],
      config: {
        whithHooks: true,
      },
    },
  },
  ignoreNoDocuments: true,
};

export default config;
