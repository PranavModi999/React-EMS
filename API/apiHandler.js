const { ApolloServer } = require("apollo-server-express");
require("dotenv").config();
const fs = require("fs");

const UserModel = require("./User/UserModel");
const GraphQLDate = require("./graphQlDate");

const resolvers = {
  Query: {
    getAllEmployees: () => UserModel.getAllEmployees(),
  },
  Mutation: {
    createNewEmployee: (_, { emp }) => UserModel.createNewEmployee(emp),
  },
  GraphQLDate,
};

const server = new ApolloServer({
  typeDefs: fs.readFileSync("./User/userSchema.graphql", "utf-8"),
  resolvers,
});

async function installHandler(app) {
  server.applyMiddleware({
    app,
    path: "/graphql",
    cors: process.env.CORS_STATUS,
  });
}

module.exports = { installHandler, server };
