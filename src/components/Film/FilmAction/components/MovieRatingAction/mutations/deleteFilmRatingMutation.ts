import { gql } from "@apollo/client";
import FILM_RATING_FRAGMENT from "@/components/Film/FilmAction/fragments/filmRatingFragment";

export default gql `
  mutation deleteFilmRating(
    $film_id: BigInt!,
    $user_id: UUID!,
  ) {
    deleteFromfilm_ratingCollection(filter: {
      film_id: { eq: $film_id },
      user_id: { eq: $user_id }
    }){
      records {
        ...FilmRating
      }
    }
  }
  ${FILM_RATING_FRAGMENT}
`