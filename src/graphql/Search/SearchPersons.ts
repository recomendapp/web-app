import { gql } from '@apollo/client';
import TMDB_PERSON_MINIMAL_FRAGMENT from '@/graphql/Person/fragments/TmdbPersonMinimal';

export default gql`
  query SearchPersons($filter: tmdb_personFilter!, $first: Int!, $after: Cursor!) {
    tmdb_personCollection(filter: $filter, first: $first, after: $after) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        endCursor
      }
      edges {
        cursor
        node {
          ...TmdbPersonMinimal
        }
      }
    }
  }
  ${TMDB_PERSON_MINIMAL_FRAGMENT}
`;
