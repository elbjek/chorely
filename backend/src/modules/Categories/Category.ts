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
import { IGraphQLDefaultArgs } from '../../common-types/IGraphQLDefaultArgs';
import { CategoryGraphQLType } from './category-graphql-type';
export class Category implements IQueryFieldCollection<unknown, unknown> {
  private readonly prisma: any;

  constructor() {
    this.prisma = prisma;
  }

  private categoriesResolver = async (
    _source: unknown,
    args: IGraphQLDefaultArgs,
    context: any,
  ) => {
    const { currentUser } = context;
    const { id } = args as { id: number };
    if (!currentUser) {
      throw new Error('Not authorized!');
    }

    const categories = await this.prisma.category.findMany({
      where: {
        userId: id,
      },
      include: {
        user: true,
        chores: true,
      },
    });
    return categories;
  };

  queryFields: GraphQLFieldConfigMap<unknown, unknown> = {
    categories: {
      type: new GraphQLNonNull(new GraphQLList(CategoryGraphQLType)),
      args: {
        id: { type: GraphQLInt },
      },
      resolve: this.categoriesResolver,
    },
  };
  mutationFields?: GraphQLFieldConfigMap<unknown, unknown> | undefined = {
    // removeChore: {
    //   type: CategoryGraphQLType,
    //   args: {
    //     id: { type: GraphQLInt },
    //   },
    //   //   resolve: this.removeChoreResolver,
    // },
  };
}
