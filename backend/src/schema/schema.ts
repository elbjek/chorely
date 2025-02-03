import { GraphQLSchema } from 'graphql';
import { Users } from '../modules/Users/Users';
import { SchemaBuilder } from './schemaBuilder';
import { Household } from '../modules/Households/Household';
import { Chore } from '../modules/Chores/Chore';
import { Category } from '../modules/Categories/Category';

// Instantiate the SchemaBuilder
const schemaBuilder = new SchemaBuilder();

// Add query and mutation fields from various modules
const users = new Users();
const chores = new Chore();
const households = new Household();
const categories = new Category();
schemaBuilder.addQueryFieldCollection(users);
schemaBuilder.addQueryFieldCollection(chores);
schemaBuilder.addQueryFieldCollection(households);
schemaBuilder.addQueryFieldCollection(categories);

// Build the schema
const schema: GraphQLSchema = schemaBuilder.buildSchema();

export default schema;
