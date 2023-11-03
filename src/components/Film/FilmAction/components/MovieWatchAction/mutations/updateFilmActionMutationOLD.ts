import { gql } from "@apollo/client";
import FILM_WATCH_FRAGMENT from "@/components/Film/FilmAction/fragments/filmWatchFragment";

export default gql `
  mutation updateFilmWatch(
    $film_id: BigInt!
    $user_id: UUID!
    $date: Datetime
  ) {
    updatefilm_watchCollection(filter: {
      film_id: { eq: $film_id }
      user_id: { eq: $user_id }
    }, set: {
      date: $date
    }) {
      records {
        ...FilmWatch
      }
    }
  }
  ${FILM_WATCH_FRAGMENT}
`