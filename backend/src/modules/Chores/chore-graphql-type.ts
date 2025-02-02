import {
  GraphQLInt,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLBoolean,
} from 'graphql';
import { UserGraphQLType } from '../Users/user-graphql-type';

export const ChoreGraphQLType = new GraphQLObjectType({
  name: 'Chore',
  fields: {
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    user: { type: UserGraphQLType },
    point: { type: GraphQLInt },
    description: { type: GraphQLString },
    frequency: { type: GraphQLInt },
    isCompleted: { type: GraphQLBoolean },
  },
});
