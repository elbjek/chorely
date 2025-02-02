import { gql } from '@apollo/client';

export const CREATE_CHORE_MUTATION = gql`
  mutation Mutation(
    $name: String!
    $householdId: Int!
    $points: Int!
    $description: String
  ) {
    createChore(
      name: $name
      householdId: $householdId
      points: $points
      description: $description
    ) {
      description
      frequency
      id
      isCompleted
      name
      user {
        name
        id
      }
      point
    }
  }
`;

export const GET_CHORES_FOR_USER = gql`
  query getAllChores {
    chores {
      description
      frequency
      id
      isCompleted
      name
      point
      user {
        id
        name
      }
    }
  }
`;

export const REMOVE_CHORE = gql`
  mutation Mutation($id: Int) {
    removeChore(id: $id) {
      id
    }
  }
`;
