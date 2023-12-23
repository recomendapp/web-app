import { gql } from "@apollo/client";
import USER_MOVIE_ACTIVITY_FRAGMENT from "@/components/Film/FilmAction/fragments/userMovieActivityFragment";

export default gql`
    query Feed(
        $filter: user_movie_activityFilter!
        $orderBy: [user_movie_activityOrderBy!]!
        $first: Int!
        $after: Cursor!
    ) {
        user_movie_activityCollection(
            filter: $filter
            orderBy: $orderBy
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
                node {
                    ...UserMovieActivity
                }
            }
        }
    }
    ${USER_MOVIE_ACTIVITY_FRAGMENT}
`