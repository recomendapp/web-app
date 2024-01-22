import { gql } from '@apollo/client';
import USER_MOVIE_ACTIVITY_FRAGMENT from '@/graphql/User/Movie/Activity/fragments/UserMovieActivity';

export default gql`
  query GetUserMovieActivity($filter: user_movie_activityFilter, $orderBy: [user_movie_activityOrderBy!], $locale: String!) {
    user_movie_activityCollection(
      filter: $filter
      orderBy: $orderBy
    ) {
      pageInfo {
        startCursor
        endCursor
        hasNextPage
        hasPreviousPage
      }
      edges {
        node {
          ...UserMovieActivity
        }
      }
    }
  }
  ${USER_MOVIE_ACTIVITY_FRAGMENT}
`;
