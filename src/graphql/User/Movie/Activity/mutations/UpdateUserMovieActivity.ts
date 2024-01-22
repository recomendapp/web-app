import { gql } from '@apollo/client';
import USER_MOVIE_ACTIVITY_MINIMAL_FRAGMENT from '@/graphql/User/Movie/Activity/fragments/UserMovieActivityMinimal';

export default gql`
  mutation UpdateUserMovieActivity(
    $id: BigInt!
    $movie_id: BigInt!
    $user_id: UUID!
    $is_liked: Boolean
    $rating: Int
    $date: Datetime
  ) {
    updateuser_movie_activityCollection(
      filter: { id: { eq: $id } }
      set: {
        movie_id: $movie_id
        user_id: $user_id
        is_liked: $is_liked
        rating: $rating
        date: $date
      }
    ) {
      records {
        ...UserMovieActivityMinimal
      }
    }
  }
  ${USER_MOVIE_ACTIVITY_MINIMAL_FRAGMENT}
`;
