import { gql } from "@apollo/client";
import FRIEND_FRAGMENT from "../fragments/friendFragment";

export default gql`
    query UserFriends($user_id: UUID!) {
        friendCollection(filter: { user_id: { eq: $user_id }}) {
            edges {
                friend: node {
                    ...Friend
                }
            }
        }
    }
    ${FRIEND_FRAGMENT}
`