import {
  GraphQLInt,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLBoolean,
} from 'graphql';
import { UserGraphQLType } from '../Users/user-graphql-type';
import { ChoreGraphQLType } from '../Chores/chore-graphql-type';

export const CategoryGraphQLType = new GraphQLObjectType({
  name: 'Category',
  fields: {
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    user: { type: UserGraphQLType },
    chores: { type: new GraphQLList(ChoreGraphQLType) },
  },
});
