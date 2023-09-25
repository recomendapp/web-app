import { gql } from "@apollo/client";

export default gql`
    fragment FilmAction on film_action {
        id
        created_at
        film_id
        user_id
        is_liked
        is_watched
        rating
        is_watchlisted
        review_id
    }
`