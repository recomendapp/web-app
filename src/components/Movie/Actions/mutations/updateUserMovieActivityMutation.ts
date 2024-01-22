import { gql } from '@apollo/client';
import USER_MOVIE_ACTIVITY_FRAGMENT from '@/components/Movie/Actions/fragments/userMovieActivityFragment';

export default gql`
  mutation updateUserMovieActivity(
    $set: user_movie_activityUpdateInput!
    $filter: user_movie_activityFilter
    $locale: String!
  ) {
    updateuser_movie_activityCollection(filter: $filter, set: $set) {
      records {
        ...UserMovieActivity
      }
    }
  }
  ${USER_MOVIE_ACTIVITY_FRAGMENT}
`;
