import {
  GraphQLFieldConfigMap,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLString,
} from "graphql";
import { IQueryFieldCollection } from "../../IQueryFieldCollection";
import prisma from "../../prismaClient";
import { IGraphQLDefaultArgs } from "../../common-types/IGraphQLDefaultArgs";
import { HouseholdGraphQLType } from "./household-graphql-type";
export class Household implements IQueryFieldCollection<unknown, unknown> {
  private readonly prisma: any;

  constructor() {
    this.prisma = prisma;
  }

  private householdsResolver = async () => {
    const households = await this.prisma.household.findMany();
    return households;
  };

  private createHouseholdResolver = async (
    _source: unknown,
    args: { userId: number; name: string },
    context: any
  ) => {
    const { userId, name } = args;
    const household = await this.prisma.household.create({
      data: {
        name,
        users: {
          connect: {
            id: userId,
          },
        },
      },
    });
    return household;
  };

  private householdByUserResolver = async (
    _source: unknown,
    args: { userId: number },
    context: any
  ) => {
    const { userId } = args;
    const household = await this.prisma.household.findFirst({
      where: {
        users: {
          some: {
            id: userId,
          },
        },
      },
      include: {
        users: true, // Include users in the household
      },
    });
    return household;
  };

  private householdResolver = async (
    _source: unknown,
    args: IGraphQLDefaultArgs,
    context: any
  ) => {
    const { id } = args as { id: number };
    const household = await this.prisma.household.findUnique({
      where: {
        id: id,
      },
    });
    return household;
  };
  queryFields: GraphQLFieldConfigMap<unknown, unknown> = {
    householdByUser: {
      type: HouseholdGraphQLType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve: this.householdByUserResolver,
    },
  };
  mutationFields?: GraphQLFieldConfigMap<unknown, unknown> | undefined = {
    createHousehold: {
      type: HouseholdGraphQLType,
      args: {
        userId: { type: new GraphQLNonNull(GraphQLInt) },
        name: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: this.createHouseholdResolver,
    },
  };
}
