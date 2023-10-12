const { ApolloServer } = require("apollo-server-express");
const { GraphQLScalarType } = require("graphql");
const express = require("express");

require("dotenv").config();

const fs = require("fs");

const UserModel = require("./User/UserModel");
const database = require("./db");

const GraphQLDate = new GraphQLScalarType({
  name: "GraphQLDate",
  description: "A Date() type in GraphQL as a scalar",
  parseValue(value) {
    return new Date(value);
  },
  parseLiteral(ast) {
    return ast.kind == Kind.STRING ? new Date(ast.value) : undefined;
  },
  serialize(value) {
    return value.toISOString();
  },
});

const resolvers = {
  Query: {
    getAllEmployees: () => {
      return UserModel.getAllEmployees();
    },
  },
  Mutation: {
    createNewEmployee: (_, { emp }) => {
      return UserModel.createNewEmployee(emp);
    },
  },
  GraphQLDate,
};

const app = express();

app.use(express.static("public"));

async function startServer() {
  const server = new ApolloServer({
    typeDefs: fs.readFileSync("./server/User/userSchema.graphql", "utf-8"),
    resolvers: resolvers,
  });

  await server.start();

  await database.dbConnect();

  server.applyMiddleware({ app, path: "/graphql" });

  app.listen(process.env.PORT, () =>
    console.log(`Server started listening on port ${process.env.PORT}...`)
  );
}

startServer();
