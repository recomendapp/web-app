import { gql } from "@apollo/client";
import FILM_RATING_FRAGMENT from "@/components/Film/FilmAction/fragments/filmRatingFragment";

export default gql `
  mutation updateFilmRating(
    $film_id: BigInt!
    $user_id: UUID!
    $rating: Int!
  ) {
    updatefilm_ratingCollection(filter: {
      film_id: { eq: $film_id }
      user_id: { eq: $user_id }
    }, set: {
      rating: $rating
    }) {
      records {
        ...FilmRating
      }
    }
  }
  ${FILM_RATING_FRAGMENT}
`