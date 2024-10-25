import { ApolloServer, gql } from "apollo-server";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
import schema from "./schema/schema";
dotenv.config();

// // GraphQL schema
// const typeDefs = gql`
//   type User {
//     id: ID!
//     email: String!
//     name: String
//   }

//   type Query {
//     users: [User]
//   }

//   type Mutation {
//     createUser(email: String!, name: String): User
//   }
// `;

// // GraphQL resolvers
// const resolvers = {
//   Query: {
//     users: async () => {
//       const users = await prisma.user.findMany();
//       console.log(users);
//       return users;
//     },
//   },
//   Mutation: {
//     createUser: async (
//       _: unknown,
//       { email, name }: { email: string; name?: string }
//     ) => {
//       return prisma.user.create({
//         data: {
//           email,
//           name,
//         },
//       });
//     },
//   },
// };

// Create Apollo Server
const server = new ApolloServer({
  schema,
  cors: {
    origin: "*", // Allow all origins
  },
});

// Start the server
server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
