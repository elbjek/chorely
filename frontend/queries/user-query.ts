// frontend/graphql/queries.ts
import { gql } from "@apollo/client";

export const GET_CURRENT_USER = gql`
  query GetCurrentUser {
    currentUser {
      id
      name
      email
    }
  }
`;
export const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

export const CREATE_USER_MUTATION = gql`
mutation Mutation($email: String!, $password: String!, $name: String) {
  createUser(email: $email, password: $password, name: $name) {
    id
    name
    password
    email
  }
}`