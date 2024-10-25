// @ts-expect-error Known build error
import { GraphQLFieldConfigMap, Thunk } from "graphql";

export interface IQueryFieldCollection<TSource, TContext> {
  queryFields: Thunk<GraphQLFieldConfigMap<TSource, TContext>>;
  mutationFields?: Thunk<GraphQLFieldConfigMap<TSource, TContext>>;
}
