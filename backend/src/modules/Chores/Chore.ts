import {
  GraphQLBoolean,
  GraphQLFieldConfigMap,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLString,
} from 'graphql';
import { IQueryFieldCollection } from '../../IQueryFieldCollection';
import prisma from '../../prismaClient';
import { ChoreGraphQLType } from './chore-graphql-type';
import { IGraphQLDefaultArgs } from '../../common-types/IGraphQLDefaultArgs';
export class Chore implements IQueryFieldCollection<unknown, unknown> {
  private readonly prisma: any;

  constructor() {
    this.prisma = prisma;
  }

  private choresResolver = async (
    _source: unknown,
    args: IGraphQLDefaultArgs,
    context: any,
  ) => {
    const { currentUser } = context;

    if (!currentUser) {
      throw new Error('Not authorized!');
    }

    const chores = await this.prisma.chore.findMany({
      where: {
        userId: currentUser.id,
      },
      include: {
        user: true,
        category: true,
      },
    });
    return chores;
  };

  private removeChoreResolver = async (
    _source: unknown,
    args: IGraphQLDefaultArgs,
    context: any,
  ) => {
    const { currentUser } = context;
    if (!currentUser) {
      throw new Error('Not authorized!');
    }
    const { id } = args as { id: number };
    const existing = await this.prisma.chore.findFirst({
      where: {
        id: id,
      },
    });
    if (!existing) {
      throw new Error('Chore already deleted');
    }
    const chore = await this.prisma.chore.delete({
      where: {
        id: id,
      },
    });

    return chore;
  };

  private chorePerCategoryResolver = async (
    _source: unknown,
    args: IGraphQLDefaultArgs,
    context: any,
  ) => {
    const { currentUser } = context;
    const { categoryId, userId } = args as {
      categoryId: number;
      userId: number;
    };
    if (!currentUser) {
      throw new Error('Not authorized!');
    }

    const chores = await this.prisma.chore.findMany({
      where: {
        categoryId: categoryId,
        userId: userId, // Filter by currentUser
      },
      include: {
        user: true,
        category: true,
      },
    });
    return chores;
  };

  private createChores = async (
    _source: unknown,
    args: IGraphQLDefaultArgs,
    context: any,
  ) => {
    const { name, points, description, householdId, categoryId } = args as {
      name: string;
      points: number;
      description: string;
      householdId: number;
      categoryId: number;
    };
    const { currentUser } = context;

    if (!currentUser) {
      throw new Error('Not authorized!');
    }

    const existingChore = await this.prisma.chore.findFirst({
      where: {
        name: name,
        householdChores: {
          some: {
            householdId: householdId,
          },
        },
      },
    });

    if (existingChore) {
      throw new Error('A chore with the same name exists in this household.');
    }

    const chore = await this.prisma.chore.create({
      data: {
        name: name,
        point: points,
        frequency: 0,
        userId: currentUser.id,
        isCompleted: false,
        description: description,
        householdChores: {
          create: {
            householdId: householdId,
          },
        },
        categoryId: categoryId,
      },
    });
    return chore;
  };

  queryFields: GraphQLFieldConfigMap<unknown, unknown> = {
    chores: {
      type: new GraphQLNonNull(new GraphQLList(ChoreGraphQLType)),
      resolve: this.choresResolver,
    },
    choresByCategory: {
      type: new GraphQLNonNull(new GraphQLList(ChoreGraphQLType)),
      args: {
        categoryId: { type: GraphQLInt },
        userId: { type: GraphQLInt },
      },
      resolve: this.chorePerCategoryResolver,
    },
  };
  mutationFields?: GraphQLFieldConfigMap<unknown, unknown> | undefined = {
    createChore: {
      type: ChoreGraphQLType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLString },
        householdId: { type: new GraphQLNonNull(GraphQLInt) },
        points: { type: new GraphQLNonNull(GraphQLInt) },
        categoryId: { type: GraphQLInt },
      },
      resolve: this.createChores,
    },
    removeChore: {
      type: ChoreGraphQLType,
      args: {
        id: { type: GraphQLInt },
      },
      resolve: this.removeChoreResolver,
    },
  };
}
