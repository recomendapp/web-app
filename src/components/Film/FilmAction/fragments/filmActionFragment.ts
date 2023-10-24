import { gql } from "@apollo/client";
import FILM_FRAGMENT from "@/components/Film/fragments/filmFragment";
import USER_FRAGMENT from "@/context/AuthContext/fragments/userFragment";

export default gql`
    fragment FilmAction on film_action {
        id
        created_at
        film_id
        user_id
        user {
            ...User
        }
        is_liked
        is_watched
        watched_date
        rating
        is_watchlisted
        review_id
    }
    ${FILM_FRAGMENT}
    ${USER_FRAGMENT}
`