import { gql } from "@apollo/client";
import USER_FRAGMENT from "@/context/AuthContext/fragments/userFragment";

export default gql`
    query SearchUsers(
        $search: String
        $first: Int!
        $after: Cursor!
    ) {
        userCollection(
            filter: {
                username: { iregex: $search }
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
                user: node {
                    ...User
                }
            }
        }
    }
    ${USER_FRAGMENT}
`