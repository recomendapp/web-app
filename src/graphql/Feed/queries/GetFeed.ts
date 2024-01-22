import { gql } from '@apollo/client';
import USER_MOVIE_ACTIVITY_FRAGMENT from '@/graphql/User/Movie/Activity/fragments/UserMovieActivity';

export default gql`
  query GetFeed(
    $filter: user_movie_activityFilter!
    $orderBy: [user_movie_activityOrderBy!]!
    $first: Int!
    $after: Cursor!
    $locale: String!
  ) {
    user_movie_activityCollection(
      filter: $filter
      orderBy: $orderBy
      first: $first
      after: $after
    ) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        endCursor
      }
      edges {
        cursor
        node {
          ...UserMovieActivity
        }
      }
    }
  }
  ${USER_MOVIE_ACTIVITY_FRAGMENT}
`;
