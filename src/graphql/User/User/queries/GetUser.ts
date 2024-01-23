import { gql } from '@apollo/client';
import USER_FRAGMENT from '@/graphql/User/User/fragments/User';

export default gql`
  query GetUser($filter: userFilter) {
    userCollection(filter: $filter, last: 1) {
      edges {
        user: node {
          ...User
        }
      }
    }
  }
  ${USER_FRAGMENT}
`;
