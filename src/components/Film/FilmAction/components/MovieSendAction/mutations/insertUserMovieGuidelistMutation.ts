import { gql } from "@apollo/client";
import USER_MOVIE_GUIDELIST_FRAGMENT from "@/components/Playlist/Guidelist/fragments/userMovieGuidelistFragment";

export default gql `
  mutation insertGuidelist(
    $film_id: BigInt!
    $receiver_user_id: UUID!
    $sender_user_id: UUI!
    $comment: String
  ) {
    insertIntouser_movie_guidelistCollection(
      objects: {
        film_id: $film_id
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
`