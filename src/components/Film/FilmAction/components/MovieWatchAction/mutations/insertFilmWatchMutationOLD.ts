import { gql } from "@apollo/client";
import FILM_WATCH_FRAGMENT from "@/components/Film/FilmAction/fragments/filmWatchFragment";

export default gql `
  mutation insertFilmWatch(
    $film_id: BigInt!,
    $user_id: UUID!,
  ) {
    insertIntofilm_watchCollection(objects: {
      film_id: $film_id,
      user_id: $user_id,
    }) {
      records {
        ...FilmWatch
      }
    }
  }
  ${FILM_WATCH_FRAGMENT}
`