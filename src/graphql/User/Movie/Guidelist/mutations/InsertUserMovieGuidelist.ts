import { gql } from '@apollo/client';
import USER_MOVIE_GUIDELIST_FRAGMENT from '@/graphql/User/Movie/Guidelist/fragments/UserMovieGuidelist';

export default gql`
  mutation InsertUserMovieGuidelist(
    $movie_id: BigInt!
    $receiver_user_id: UUID!
    $sender_user_id: UUID!
    $comment: String
    $locale: String!
  ) {
    insertIntouser_movie_guidelistCollection(
      objects: {
        movie_id: $movie_id
        receiver_user_id: $receiver_user_id
        sender_user_id: $sender_user_id
        comment: $comment
      }
    ) {
      records {
        ...UserMovieGuidelist
      }
    }
  }
  ${USER_MOVIE_GUIDELIST_FRAGMENT}
`;
