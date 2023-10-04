import { gql } from "@apollo/client";
import FILM_ACTION_FRAGMENT from "@/components/Film/FilmAction/fragments/filmActionFragment";

export default gql `
mutation insertFilmAction(
  $film_id: BigInt!,
  $user_id: UUID!,
  $is_liked: Boolean,
  $is_watched: Boolean,
  $rating: Int,
  $is_watchlisted: Boolean,
  $review_id: BigInt
) {
  insertIntofilm_actionCollection(objects: {
    film_id: $film_id,
    user_id: $user_id,
    is_liked: $is_liked,
    is_watched: $is_watched,
    rating: $rating,
    is_watchlisted: $is_watchlisted,
    review_id: $review_id,
  }) {
    records {
      ...FilmAction
    }
  }
}
  ${FILM_ACTION_FRAGMENT}
`