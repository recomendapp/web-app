import { gql } from "@apollo/client";
import USER_FRAGMENT from "@/context/AuthContext/fragments/userFragment";

export default gql`
    fragment PlaylistGuest on playlist_guest {
        id
        created_at
        playlist_id
        user_id
        user {
            ...User
        }
        edit
    }
    ${USER_FRAGMENT}
`