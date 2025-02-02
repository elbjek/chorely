import {
  GraphQLInt,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
} from "graphql";
import { UserGraphQLType } from "../Users/user-graphql-type";

export const ChoreGraphQLType = new GraphQLObjectType({
  name: "Chore",
  fields: {
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    users: { type: new GraphQLList(UserGraphQLType) },
  },
});
