import { ApolloClient, InMemoryCache } from "@apollo/client";
import { HttpLink } from "@apollo/client/link/http";
import fetch from "isomorphic-fetch";

const client = new ApolloClient({
  link: new HttpLink({
    uri: "http://192.168.0.49:4000/graphql", // Set this URI only once
    fetch,
  }),
  cache: new InMemoryCache(),
});

let apolloClient: any = null;

export function initializeApollo(initialState = null) {
  const _apolloClient = apolloClient ?? client;

  if (initialState) {
    _apolloClient.cache.restore(initialState);
  }

  if (typeof window === "undefined") return _apolloClient;
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

export { client };
