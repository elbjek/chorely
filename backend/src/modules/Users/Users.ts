import {
  GraphQLFieldConfigMap,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLString,
} from 'graphql';
import { UserGraphQLType, LoginResponseType } from './user-graphql-type'; // Adjust the import path as necessary
import { IQueryFieldCollection } from '../../IQueryFieldCollection';
import prisma from '../../prismaClient';
import { IGraphQLDefaultArgs } from '../../common-types/IGraphQLDefaultArgs';
import { v4 as uuid } from 'uuid';
import {
  comparePassword,
  decrypt,
  encrypt,
  generateToken,
  hashPassword,
  verifyToken,
} from '../../auth';
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
    const users = await this.prisma.user.findMany({
      include: {
        households: true,
      },
    });
    return users;
  };

  private usersResolver = async (
    _source: unknown,
    args: IGraphQLDefaultArgs,
    context: any,
  ) => {
    if (!context.currentUser) {
      // throw new Error("Not authenticated");
    }
    const users = await this.fetchUsers();

    const decryptedUsers = users.map((user) => {
      return {
        ...user,
        email: decrypt(user.email),
      };
    });
    return decryptedUsers;
  };

  private createUserMutationResolver = async (
    _source: unknown,
    args: IGraphQLDefaultArgs,
    context: any,
  ) => {
    const { email, password, name } = args as {
      email: string;
      password: string;
      name?: string;
    };
    const existing = await prisma.user.findUnique({
      where: { email: encrypt(email) },
    });
    if (existing) {
      throw new Error('User already exists');
    }

    try {
      // Create a new user if one does not already exist
      const hashedPassword = await hashPassword(password);
      const hashedEmail = await encrypt(email);
      const uniqueLink = uuid();

      const user = await this.prisma.user.create({
        data: {
          email: hashedEmail,
          name,
          password: hashedPassword,
          households: {
            create: {
              name: `${name ?? 'Unnamed'} Household`,
              householdInvitationURL: uniqueLink,
              isDefaultHousehold: true,
              isSetup: false,
            },
          },
        },
        include: {
          households: true,
          chores: true,
        },
      });

      const household = user.households[0]; // Get the created household

      if (!household) {
        throw new Error('Household creation failed');
      }

      const defaultChores = [
        { name: 'Take out trash', frequency: 7, point: 10 },
        { name: 'Wash dishes', frequency: 1, point: 5 },
        { name: 'Vacuum living room', frequency: 3, point: 8 },
        { name: 'Clean bathroom', frequency: 7, point: 12 },
        { name: 'Do laundry', frequency: 7, point: 7 },
        { name: 'Mop the floor', frequency: 3, point: 9 },
        { name: 'Water plants', frequency: 4, point: 4 },
        { name: 'Wipe windows', frequency: 14, point: 6 },
        { name: 'Dust furniture', frequency: 7, point: 5 },
        { name: 'Organize shelves', frequency: 14, point: 8 },
      ];

      const createdChores = await Promise.all(
        defaultChores.map((chore) =>
          prisma.chore.create({
            data: {
              ...chore,
              userId: user.id,
            },
          }),
        ),
      );

      // Link created chores to the household
      await prisma.householdChore.createMany({
        data: createdChores.map((chore) => ({
          householdId: household.id,
          choreId: chore.id,
        })),
      });

      return {
        ...user,
        email: decrypt(user.email),
      };
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  private userResolver = async (
    _source: unknown,
    args: IGraphQLDefaultArgs,
    context: any,
  ) => {
    if (!context.currentUser) {
      throw new Error('Not authenticated');
    }

    const { id } = args as { id: number };
    const user = await this.prisma.user.findUnique({
      where: {
        id: id,
      },
      include: {
        households: true,
      },
    });
    return {
      ...user,
      email: decrypt(user.email),
    };
  };

  private loginResolver = async (
    _source: unknown,
    args: IGraphQLDefaultArgs,
    context: any,
  ) => {
    const { email, password } = args as { email: string; password: string };

    const user = await this.prisma.user.findUnique({
      where: {
        email: encrypt(email),
      },
      include: {
        households: true,
      },
    });

    if (!user || !(await comparePassword(password, user.password))) {
      throw new Error('Invalid credentials');
    }
    const token = generateToken({
      id: user.id,
      email: decrypt(user.email),
      name: user.name,
    });
    return {
      user,
      token,
    };
  };

  private currentUserResolver = async (
    _source: unknown,
    args: IGraphQLDefaultArgs,
    context: any,
  ) => {
    if (!context.currentUser) {
      throw new Error('Not authenticated');
    }
    const user = await this.prisma.user.findUnique({
      where: {
        id: context.currentUser.id,
      },
      include: {
        households: true,
        chores: true,
      },
    });
    return {
      ...user,
      email: decrypt(user.email),
    };
  };

  queryFields: GraphQLFieldConfigMap<unknown, unknown> = {
    users: {
      type: new GraphQLNonNull(new GraphQLList(UserGraphQLType)),
      resolve: this.usersResolver,
    },
    user: {
      type: UserGraphQLType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve: this.userResolver,
    },
    currentUser: {
      type: UserGraphQLType,
      resolve: this.currentUserResolver,
    },
  };

  mutationFields: GraphQLFieldConfigMap<unknown, unknown> = {
    createUser: {
      type: UserGraphQLType,
      args: {
        email: { type: new GraphQLNonNull(GraphQLString) },
        name: { type: GraphQLString },
        password: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: this.createUserMutationResolver,
    },
    login: {
      type: LoginResponseType,
      args: {
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: this.loginResolver,
    },
  };
}
