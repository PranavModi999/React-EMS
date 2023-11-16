const { ApolloServer } = require("apollo-server-express");
require("dotenv").config();
const fs = require("fs");

const UserModel = require("./User/UserModel");
const GraphQLDate = require("./graphQlDate");

const resolvers = {
  Query: {
    getAllEmployees: (_, { filter }) => UserModel.getAllEmployees(filter),
    getEmployeeById: (_, { id }) => UserModel.getEmployeeById(id),
  },
  Mutation: {
    updateEmployeeById: (_, { emp }) => UserModel.updateEmployeeById(emp),
    createNewEmployee: (_, { emp }) => UserModel.createNewEmployee(emp),
    deleteEmployeeById: (_, { id }) => UserModel.deleteEmployeeById(id),
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
