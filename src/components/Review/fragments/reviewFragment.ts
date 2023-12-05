import { gql } from "@apollo/client";

import USER_FRAGMENT from "@/context/AuthContext/fragments/userFragment";
import FILM_RATING_FRAGMENT from "@/components/Film/FilmAction/fragments/filmRatingFragment";

export default gql`
    fragment Review on review {
        id
        film_id
        user_id
        user {
            ...User
        }
        title
        body
        likes_count
        comments_count
        views_count
    }
    ${USER_FRAGMENT}
    ${FILM_RATING_FRAGMENT}
`