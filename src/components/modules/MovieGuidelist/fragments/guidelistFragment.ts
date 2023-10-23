import { gql } from "@apollo/client";
import USER_FRAGMENT from "@/context/AuthContext/fragments/userFragment";
import FILM_FRAGMENT from "@/components/Film/fragments/filmFragment";

export default gql`
    fragment Guidelist on guidelist {
        id
        film_id
        film {
            ...Film
        }
        receiver_user_id
        sender_user_id
        comment
        sender_user: user {
            ...User
        }
    }
    ${USER_FRAGMENT}
    ${FILM_FRAGMENT}
`