import { gql } from "@apollo/client";
import FILM_LIKE_FRAGMENT from "@/components/Film/FilmAction/fragments/filmLikeFragment";

export default gql `
  mutation insertFilmLike(
    $film_id: BigInt!,
    $user_id: UUID!,
  ) {
    insertIntofilm_likeCollection(objects: {
      film_id: $film_id,
      user_id: $user_id,
    }) {
      records {
        ...FilmLike
      }
    }
  }
  ${FILM_LIKE_FRAGMENT}
`