import { gql } from "@apollo/client";
import USER_FRAGMENT from "@/context/AuthContext/fragments/userFragment";

export default gql`
    query SearchUsers(
        $filter: userFilter!
        $first: Int!
        $after: Cursor!
    ) {
        userCollection(
            filter: $filter
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
                user: node {
                    ...User
                }
            }
        }
    }
    ${USER_FRAGMENT}
`