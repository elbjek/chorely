import {
  GraphQLInt,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
} from "graphql";
import { UserGraphQLType } from "../Users/user-graphql-type";

export const HouseholdGraphQLType = new GraphQLObjectType({
  name: "Household",
  fields: {
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    users: { type: new GraphQLList(UserGraphQLType) },
  },
});
