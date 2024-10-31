import { ApolloServer, gql } from "apollo-server";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
import schema from "./schema/schema";
import { verifyToken } from "./auth";
dotenv.config();

// Create Apollo Server
const server = new ApolloServer({
  schema,
  cors: {
    origin: "*", // Allow all origins
    credentials: true,
  },
  context: async ({ req }) => {
    let authToken = null;
    let currentUser = null;

    if (req.headers && req.headers.authorization) {
      authToken = req.headers.authorization;
      console.log("Auth Token:", req.headers);
      try {
        currentUser = verifyToken(authToken);
        // console.log("Current User:", currentUser);
      } catch (error) {
        console.error("Invalid token", error);
      }
    }

    return { currentUser };
  },
});

// Start the server
server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
