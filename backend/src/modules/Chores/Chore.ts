import {
	GraphQLFieldConfigMap,
	GraphQLInt,
	GraphQLNonNull,
	GraphQLString,
} from "graphql";
import { IQueryFieldCollection } from "../../IQueryFieldCollection";
import prisma from "../../prismaClient";
import { ChoreGraphQLType } from "./chore-graphql-type";
export class Chore implements IQueryFieldCollection<unknown, unknown> {
	private readonly prisma: any;

	constructor() {
		this.prisma = prisma;
	}

	private choresResolver = async () => {
		const chores = await this.prisma.household.findMany();
		return chores;
	};

	queryFields: GraphQLFieldConfigMap<unknown, unknown> = {
		chores: {
			type: ChoreGraphQLType,
			args: {
				id: { type: new GraphQLNonNull(GraphQLInt) },
			},
			resolve: this.choresResolver,
		},
	};
	mutationFields?: GraphQLFieldConfigMap<unknown, unknown> | undefined = {
		createChore: {
			type: ChoreGraphQLType,
			args: {
				userId: { type: new GraphQLNonNull(GraphQLInt) },
				name: { type: new GraphQLNonNull(GraphQLString) },
			},
		}
	};
}
