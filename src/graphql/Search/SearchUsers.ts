import { gql } from '@apollo/client';
import USER_FRAGMENT from '@/graphql/User/User/fragments/User';

export default gql`
  query SearchUsers($filter: userFilter!, $first: Int!, $after: Cursor!) {
    userCollection(filter: $filter, first: $first, after: $after) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        endCursor
      }
      edges {
        cursor
        node {
          ...User
        }
      }
    }
  }
  ${USER_FRAGMENT}
`;
