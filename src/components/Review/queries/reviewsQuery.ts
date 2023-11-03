import { gql } from "@apollo/client";
import PLAYLIST_FRAGMENT from '@/components/modules/MoviePlaylist/fragments/playlistFragment'
import REVIEW_FRAGMENT from "@/components/Review/fragments/reviewFragment";

export default gql`
    query Reviews(
        $film_id: BigInt!
        $first: Int!
        $after: Cursor!
    ) {
        reviewCollection(
            filter: {
                film_id: { eq: $film_id }
            }
            first: $first
            after: $after
        ) {
            pageInfo {
                hasNextPage
                hasPreviousPage
                endCursor
            }
            edges {
                cursor
                review: node {
                    ...Review
                }
            }
        }
    }
    ${REVIEW_FRAGMENT}
`