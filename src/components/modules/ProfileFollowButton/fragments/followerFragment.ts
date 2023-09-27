import { gql } from "@apollo/client";

export default gql`
    fragment Follower on follower {
        followee_id
        follower_id
    }
`