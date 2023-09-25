import USER_FRAGMENT from "@/context/AuthContext/fragments/userFragment";
import { gql } from "@apollo/client";
import FILM_FRAGMENT from "@/components/modules/Film/fragments/filmFragment";

export default gql`
    fragment PlaylistItem on playlist_item {
        id
        created_at
        playlist_id
        film_id
        user_id
        comment
        rank
        user {
            ...User
        }
        film {
            ...Film
        }
    }
    ${USER_FRAGMENT}
    ${FILM_FRAGMENT}
`