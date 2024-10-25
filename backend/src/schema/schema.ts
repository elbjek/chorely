import { GraphQLSchema } from "graphql";
import { Users } from "../modules/Users/Users";
import { SchemaBuilder } from "./schemaBuilder";
import { Household } from "../modules/Households/Household";

// Instantiate the SchemaBuilder
const schemaBuilder = new SchemaBuilder();

// Add query and mutation fields from various modules
const users = new Users();
const households = new Household();
schemaBuilder.addQueryFieldCollection(users);
schemaBuilder.addQueryFieldCollection(households);

// Build the schema
const schema: GraphQLSchema = schemaBuilder.buildSchema();

export default schema;
