import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client";
import { ApolloLink, HttpLink } from "@apollo/client/core";
import { setContext } from "@apollo/client/link/context";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const createApolloLink = (authToken?: string): ApolloLink => {
  const httpLink = new HttpLink({
    uri: "http://192.168.0.30:4000/graphql",

    credentials: "include",
  });

  const authLink = setContext(async (_, { headers = {} }) => {
    const token = authToken || (await AsyncStorage.getItem("authToken"));

    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      },
    };
  });

  return authLink.concat(httpLink);
};

// Ensure the client is typed with NormalizedCacheObject
const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  link: createApolloLink(),
  cache: new InMemoryCache(),
});

export { client };
