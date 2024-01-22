import { gql } from '@apollo/client';
import USER_MOVIE_ACTIVITY_MINIMAL_FRAGMENT from '@/graphql/User/Movie/Activity/fragments/UserMovieActivityMinimal';

export default gql`
  mutation DeleteUserMovieActivity($movie_id: BigInt!, $user_id: UUID!) {
    deleteFromuser_movie_activityCollection(
      filter: { movie_id: { eq: $movie_id }, user_id: { eq: $user_id } }
    ) {
      records {
        ...UserMovieActivityMinimal
      }
    }
  }
  ${USER_MOVIE_ACTIVITY_MINIMAL_FRAGMENT}
`;
