import { gql } from "@apollo/client";
import FILM_ACTION_FRAGMENT from "@/components/modules/MovieAction/fragments/filmActionFragment";

export default gql `
  mutation updateFilmAction(
    $film_id: BigInt!
    $user_id: UUID!
    $is_liked: Boolean
    $is_watched: Boolean
    $watched_date: Datetime
    $rating: Int
    $is_watchlisted: Boolean
    $review_id: BigInt!
  ) {
    updatefilm_actionCollection(filter: {
      film_id: { eq: $film_id }
      user_id: { eq: $user_id }
    }, set: {
      is_liked: $is_liked
      is_watched: $is_watched
      watched_date: $watched_date
      rating: $rating
      is_watchlisted: $is_watchlisted
      review_id: $review_id
    }) {
      records {
        ...FilmAction
      }
    }
  }
  ${FILM_ACTION_FRAGMENT}
`