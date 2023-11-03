import { gql } from "@apollo/client";
import FILM_WATCHLIST_FRAGMENT from "@/components/Film/FilmAction/fragments/filmWatchlistFragment";

export default gql `
  mutation deleteFilmWatchlist(
    $film_id: BigInt!,
    $user_id: UUID!,
  ) {
    deleteFromuser_movie_watchlistCollection(filter: {
      film_id: { eq: $film_id },
      user_id: { eq: $user_id }
    }){
      records {
        ...FilmWatchlist
      }
    }
  }
  ${FILM_WATCHLIST_FRAGMENT}
`