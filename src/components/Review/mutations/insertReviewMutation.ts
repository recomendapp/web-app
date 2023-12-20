import { gql } from "@apollo/client";
import REVIEW_FRAGMENT from "@/components/Review/fragments/reviewFragment";

export default gql `
  mutation insertReview(
    $film_id: BigInt!
    $user_id: UUID!
    $title: String!
    $body: String!
    $film_rating_id: BigInt!
  ) {
    insertIntoreviewCollection(objects: {
      film_id: $film_id
      user_id: $user_id
      title: $title
      body: $body
      film_rating_id: $film_rating_id
    }) {
      records {
        ...Review
      }
    }
  }
  ${REVIEW_FRAGMENT}
`