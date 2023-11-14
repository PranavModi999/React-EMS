const { GraphQLScalarType } = require("graphql");
const { Kind } = require("graphql/language");

const GraphQLDate = new GraphQLScalarType({
  name: "GraphQLDate",
  description: "A Date() type in GraphQL as a scalar",
  parseValue(value) {
    return new Date(value);
  },
  parseLiteral(ast) {
    // eslint-disable-next-line eqeqeq
    return ast.kind == Kind.STRING ? new Date(ast.value) : undefined;
  },
  serialize(value) {
    return value.toISOString();
  },
});

module.exports = GraphQLDate;
