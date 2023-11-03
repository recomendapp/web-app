import { gql } from "@apollo/client";
import FILM_LIKE_FRAGMENT from "@/components/Film/FilmAction/fragments/filmLikeFragment";

export default gql `
  mutation deleteFilmLike(
    $film_id: BigInt!,
    $user_id: UUID!,
  ) {
    deleteFromfilm_likeCollection(filter: {
      film_id: { eq: $film_id },
      user_id: { eq: $user_id }
    }){
      records {
        ...FilmLike
      }
    }
  }
  ${FILM_LIKE_FRAGMENT}
`