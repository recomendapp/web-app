import { gql } from "@apollo/client";

export default gql`
    fragment FilmWatchlist on user_movie_watchlist {
        id
        created_at
        film_id
        user_id
    }
`