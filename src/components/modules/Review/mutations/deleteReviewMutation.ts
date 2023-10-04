import { gql } from "@apollo/client";
import REVIEW_FRAGMENT from "@/components/modules/Review/fragments/reviewFragment";

export default gql `
  mutation deleteReviewMutation(
    $id: BigInt!,
  ) {
    deleteFromreviewCollection(
      filter: { id: { eq: $id } }
    ) {
      records {
        ...Review
      }
    }
  }
  ${REVIEW_FRAGMENT}
`