import { gql } from "@apollo/client";
import FOLLOWER_FRAGMENT from "@/components/modules/ProfileFollowButton/fragments/followerFragment";

export default gql`
    query FollowerQuery(
        $followee_id: UUID!
        $follower_id: UUID!
    ) {
        followerCollection(filter: {
            followee_id: { eq: $followee_id }
            follower_id: { eq: $follower_id }
        }) {
            edges {
                follower: node {
                    ...Follower
                }
            }
        }
    }
    ${FOLLOWER_FRAGMENT}
`