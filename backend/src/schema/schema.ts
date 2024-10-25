import { GraphQLSchema } from "graphql";
import { Users } from "../modules/Users/Users";
import { SchemaBuilder } from "./schemaBuilder";

// Instantiate the SchemaBuilder
const schemaBuilder = new SchemaBuilder();

// Add query and mutation fields from various modules
const users = new Users();
schemaBuilder.addQueryFieldCollection(users);

// Build the schema
const schema: GraphQLSchema = schemaBuilder.buildSchema();

export default schema;
