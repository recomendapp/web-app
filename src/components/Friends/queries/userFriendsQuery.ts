import { gql } from "@apollo/client";
import USER_FRIEND_FRAGMENT from "../fragments/userFriendFragment";

export default gql`
    query UserFriends($user_id: UUID!) {
        user_friendCollection(filter: { user_id: { eq: $user_id }}) {
            edges {
                friend: node {
                    ...UserFriend
                }
            }
        }
    }
    ${USER_FRIEND_FRAGMENT}
`