const { ApolloServer } = require("apollo-server-express");
const express = require("express");

const fs = require("fs");

const UserModel = require("./User/UserModel");
const database = require("./db");

const PORT = 3000;

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

  app.listen(PORT, () =>
    console.log(`Server started listening on port ${PORT}...`)
  );
}

startServer();
