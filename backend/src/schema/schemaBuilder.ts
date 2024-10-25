import { GraphQLObjectType, GraphQLSchema } from "graphql";
import { IQueryFieldCollection } from "../IQueryFieldCollection";

export class SchemaBuilder {
  private queryGraphQLType: GraphQLObjectType;
  private mutationGraphQLType: GraphQLObjectType;

  constructor() {
    this.queryGraphQLType = new GraphQLObjectType({
      name: "Query",
      fields: {},
    });

    this.mutationGraphQLType = new GraphQLObjectType({
      name: "Mutation",
      fields: {},
    });
  }

  public addQueryFieldCollection(
    queryFieldCollection: IQueryFieldCollection<unknown, unknown>
  ): void {
    const newConfig = this.queryGraphQLType.toConfig();
    newConfig.fields = {
      ...newConfig.fields,
      ...queryFieldCollection.queryFields,
    };
    this.queryGraphQLType = new GraphQLObjectType(newConfig);

    if (queryFieldCollection.mutationFields) {
      const newMutationConfig = this.mutationGraphQLType.toConfig();
      newMutationConfig.fields = {
        ...newMutationConfig.fields,
        ...queryFieldCollection.mutationFields,
      };

      this.mutationGraphQLType = new GraphQLObjectType(newMutationConfig);
    }
  }

  public buildSchema(): GraphQLSchema {
    return new GraphQLSchema({
      query: this.queryGraphQLType,
      mutation: this.mutationGraphQLType,
    });
  }
}
