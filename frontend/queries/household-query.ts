// frontend/graphql/queries.ts
import { gql } from "@apollo/client";


export const UPDATE_HOUSEHOLD = gql`
  mutation updateHousehold( $id:Int!, $name: String!) {
    updateHousehold(id:$id, name: $name) {
      id
      isSetup
    }
  }
`;
