import { gql } from "@apollo/client";
import REVIEW_FRAGMENT from "@/components/modules/Review/fragments/reviewFragment";

export default gql`
    query Reviews(
        $film_id: BigInt!
        $user_id: UUID!
    ) {
        reviewCollection(
        filter: {
            film_id: { eq: $film_id }
            user_id: { eq: $user_id }
        }
        ) {
        edges {
            review: node {
                ...Review
            }
        }
        }
    }
    ${REVIEW_FRAGMENT}
`