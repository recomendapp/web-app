import { gql } from "@apollo/client";
import FILM_WATCHLIST_FRAGMENT from "@/components/Film/FilmAction/fragments/filmWatchlistFragment";

export default gql `
  mutation insertFilmWatchlist(
    $film_id: BigInt!,
    $user_id: UUID!,
  ) {
    insertIntofilm_watchlistCollection(objects: {
      film_id: $film_id,
      user_id: $user_id,
    }) {
      records {
        ...FilmWatchlist
      }
    }
  }
  ${FILM_WATCHLIST_FRAGMENT}
`