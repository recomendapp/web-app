import { gql } from "@apollo/client";
import REVIEW_FRAGMENT from "@/components/modules/Review/fragments/reviewFragment";

export default gql `
  mutation updateReview(
    $id: BigInt!,
    $title: String!
    $body: String!
  ) {
    updatereviewCollection(filter: { id: {eq: $id}}, set: {
      title: $title,
      body: $body
    }) {
      records {
        ...Review
      }
    }
  }
  ${REVIEW_FRAGMENT}
`