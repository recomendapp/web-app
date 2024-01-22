import { gql } from '@apollo/client';
import USER_MOVIE_ACTIVITY_MINIMAL_FRAGMENT from '@/graphql/User/Movie/Activity/fragments/UserMovieActivityMinimal';

export default gql`
  query GetUserMovieActivityByMovieId($user_id: UUID!, $movie_id: BigInt!) {
    user_movie_activityCollection(
      filter: { user_id: { eq: $user_id }, movie_id: { eq: $movie_id } }
    ) {
      edges {
        node {
          ...UserMovieActivityMinimal
        }
      }
    }
  }
  ${USER_MOVIE_ACTIVITY_MINIMAL_FRAGMENT}
`;
