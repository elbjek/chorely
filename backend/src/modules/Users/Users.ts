import {
  GraphQLFieldConfigMap,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLString,
} from "graphql";
import { UserGraphQLType } from "./user-graphql-type"; // Adjust the import path as necessary
import { IQueryFieldCollection } from "../../IQueryFieldCollection";
import prisma from "../../prismaClient";
import { IGraphQLDefaultArgs } from "../../common-types/IGraphQLDefaultArgs";

export interface User {
  id: number;
  email: string;
  name?: string;
}

export class Users implements IQueryFieldCollection<unknown, unknown> {
  private readonly prisma: any;

  constructor() {
    this.prisma = prisma;
  }

  /**
   * Fetches all users from the database.
   *
   * @private
   * @memberof Users
   */
  private fetchUsers = async (): Promise<User[]> => {
    const users = await this.prisma.user.findMany();
    console.log(users);
    return users;
  };

  private UsersResolver = async () => {
    const users = await this.fetchUsers();
    return users;
  };

  private createUserMutationResolver = async (
    _source: unknown,
    { email, name }: { email: string; name?: string }
  ) => {
    return this.prisma.user.create({
      data: {
        email,
        name,
      },
    });
  };
  private userResolver = async (
    _source: unknown,
    args: IGraphQLDefaultArgs,
    context: any
  ) => {
    const { id } = args as { id: number };
    const user = await this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });
    return user;
  };
  queryFields: GraphQLFieldConfigMap<unknown, unknown> = {
    users: {
      type: new GraphQLNonNull(new GraphQLList(UserGraphQLType)),
      resolve: this.UsersResolver,
    },
    user: {
      type: UserGraphQLType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve: this.userResolver,
    },
  };

  mutationFields: GraphQLFieldConfigMap<unknown, unknown> = {
    createUser: {
      type: UserGraphQLType,
      args: {
        email: { type: new GraphQLNonNull(GraphQLString) },
        name: { type: GraphQLString },
      },
      resolve: this.createUserMutationResolver,
    },
  };
}
