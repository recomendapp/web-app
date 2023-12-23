import { gql } from "@apollo/client";
import USER_MOVIE_REVIEW_FRAGMENT from "@/components/Review/fragments/reviewFragment";

export default gql `
  mutation updateReview(
    $id: BigInt!,
    $title: String!
    $body: String!
  ) {
    updateuser_movie_reviewCollection(filter: { id: {eq: $id}}, set: {
      title: $title,
      body: $body
    }) {
      records {
        ...UserMovieReview
      }
    }
  }
  ${USER_MOVIE_REVIEW_FRAGMENT}
`