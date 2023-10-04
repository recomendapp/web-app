import { gql } from "@apollo/client";

import USER_FRAGMENT from "@/context/AuthContext/fragments/userFragment";
import FILM_ACTION_FRAGMENT from "@/components/Film/FilmAction/fragments/filmActionFragment";

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
        action_id
        film_action {
            ...FilmAction
        }
    }
    ${USER_FRAGMENT}
    ${FILM_ACTION_FRAGMENT}
`