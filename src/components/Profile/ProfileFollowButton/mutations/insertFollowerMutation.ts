import { gql } from "@apollo/client";

export default gql `
  mutation insertFollower(
    $followee_id: UUID!
    $follower_id: UUID!
  ) {
    insertIntofollowerCollection(objects: {
      followee_id: $followee_id,
      follower_id: $follower_id,
    }) {
      records {
        followee_id
        follower_id
      }
    }
  }
`