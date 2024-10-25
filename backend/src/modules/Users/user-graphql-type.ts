import { GraphQLInt, GraphQLObjectType, GraphQLString } from "graphql";

export const UserGraphQLType = new GraphQLObjectType({
  name: "User",
  fields: {
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
  },
});
