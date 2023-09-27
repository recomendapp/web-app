import { gql } from "@apollo/client";

import USER_FRAGMENT from "@/context/AuthContext/fragments/userFragment";

export default gql`
    fragment Friend on friend {
        friend_id
        friend: user {
            ...User
        }
        user_id
    }
    ${USER_FRAGMENT}
`