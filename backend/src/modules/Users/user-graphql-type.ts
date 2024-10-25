import { GraphQLInt, GraphQLObjectType, GraphQLString } from "graphql";
import { Household } from "../Households/Household";

export const UserGraphQLType = new GraphQLObjectType({
  name: "User",
  fields: {
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    household: {
      type: new GraphQLObjectType({
        name: "UserHousehold",
        fields: {
          id: { type: GraphQLInt },
          name: { type: GraphQLString },
        },
      }),
    },
  },
});
