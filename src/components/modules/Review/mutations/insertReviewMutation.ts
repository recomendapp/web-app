import { gql } from "@apollo/client";
import REVIEW_FRAGMENT from "@/components/modules/Review/fragments/reviewFragment";

export default gql `
  mutation insertReview(
    $film_id: BigInt!
    $user_id: UUID!
    $title: String!
    $body: String!
    $action_id: BigInt!
  ) {
    insertIntoreviewCollection(objects: {
      film_id: $film_id
      user_id: $user_id
      title: $title
      body: $body
      action_id: $action_id
    }) {
      records {
        ...Review
      }
    }
  }
  ${REVIEW_FRAGMENT}
`