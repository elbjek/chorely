import { gql } from '@apollo/client';

export const GET_CATEGORIES = gql`
  query Categories($userId: Int) {
    categories(id: $userId) {
      id
      name
      user {
        email
        id
      }
      chores {
        id
        name
      }
    }
  }
`;
