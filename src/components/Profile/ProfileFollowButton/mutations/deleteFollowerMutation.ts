import { gql } from "@apollo/client";

export default gql `
  mutation deleteFollower(
    $followee_id: UUID!
    $follower_id: UUID!
  ) {
    deleteFromfollowerCollection(filter: {
      followee_id: { eq: $followee_id },
      follower_id: { eq: $follower_id }
    }){
      records {
        followee_id
        follower_id
      }
    }
  }
`