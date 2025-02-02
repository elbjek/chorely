import { GraphQLBoolean, GraphQLInt, GraphQLList, GraphQLObjectType, GraphQLString } from "graphql";
import { Household } from "../Households/Household";

export const UserGraphQLType = new GraphQLObjectType({
  name: "User",
  fields: {
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    households: {
      type: new GraphQLList(
        new GraphQLObjectType({
          name: "UserHouseholds",
          fields: {
            id: { type: GraphQLInt },
            name: { type: GraphQLString },
            householdInvitationURL: { type: GraphQLString },  // Add URL if needed
            isSetup: { type: GraphQLBoolean },
            isDefaultHousehold: { type: GraphQLBoolean },
          },
        })
      ),
    },
  },
});

export const LoginResponseType = new GraphQLObjectType({
  name: "LoginResponse",
  fields: {
    token: { type: GraphQLString },
    user: { type: UserGraphQLType },
  },
});
