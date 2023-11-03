import { gql } from "@apollo/client";
import FILM_RATING_FRAGMENT from "@/components/Film/FilmAction/fragments/filmRatingFragment";

export default gql `
  mutation insertFilmRating(
    $film_id: BigInt!,
    $user_id: UUID!,
    $rating: Int!
  ) {
    insertIntofilm_ratingCollection(objects: {
      film_id: $film_id,
      user_id: $user_id,
      rating: $rating,
    }) {
      records {
        ...FilmRating
      }
    }
  }
  ${FILM_RATING_FRAGMENT}
`