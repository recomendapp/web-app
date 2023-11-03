import { gql } from "@apollo/client";
import FILM_WATCH_FRAGMENT from "@/components/Film/FilmAction/fragments/filmWatchFragment";

export default gql `
  mutation deleteFilmWatch(
    $film_id: BigInt!,
    $user_id: UUID!,
  ) {
    deleteFromfilm_watchCollection(filter: {
      film_id: { eq: $film_id },
      user_id: { eq: $user_id }
    }){
      records {
        ...FilmWatch
      }
    }
  }
  ${FILM_WATCH_FRAGMENT}
`