import { ApolloServer } from "apollo-server";
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
    
    const authToken = req.headers.authorization;
    let currentUser = null;
  
    if (authToken) {
      try {
        currentUser = verifyToken(authToken);
        return { currentUser };
      } catch (error) {
        console.error("Error verifying token:", error);
      }
    }
  
    return {};
  }
});

// Start the server
server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
