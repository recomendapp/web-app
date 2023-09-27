import { gql } from "@apollo/client";
import FILM_FRAGMENT from "@/components/modules/Film/fragments/filmFragment";

export default gql`
    fragment FilmAction on film_action {
        id
        created_at
        film_id
        film {
            ...Film
        }
        user_id
        is_liked
        is_watched
        rating
        is_watchlisted
        review_id
    }
    ${FILM_FRAGMENT}
`