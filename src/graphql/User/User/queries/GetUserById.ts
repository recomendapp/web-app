import { gql } from '@apollo/client';
import USER_FRAGMENT from '@/graphql/User/User/fragments/User';

export const GET_USER_BY_ID = gql`
  query GetUserById($userId: UUID!) {
    userCollection(filter: { id: { eq: $userId } }, last: 1) {
      edges {
        user: node {
          ...User
        }
      }
    }
  }
  ${USER_FRAGMENT}
`;
