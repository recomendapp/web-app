import { gql } from "@apollo/client";
import FILM_WATCHLIST_FRAGMENT from "@/components/Film/FilmAction/fragments/filmWatchlistFragment";

export default gql`
    query Watchlist($user_id: UUID!){
        watchlist: user_movie_watchlistCollection(
            filter: {
                user_id: { eq: $user_id }
            }
        ) {
            edges {
                item: node {
                    ...FilmWatchlist
                }
            }
        }
    }
    ${FILM_WATCHLIST_FRAGMENT}
`