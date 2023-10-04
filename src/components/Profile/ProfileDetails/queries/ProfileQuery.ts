import { gql } from "@apollo/client";
import USER_FRAGMENT from '@/context/AuthContext/fragments/userFragment';

export default gql`
    query ProfileQuery($username: String!) {
        userCollection(filter: { username: {eq: $username}}) {
        edges {
            user: node {
            ...User
            }
        }
        }
    }
    ${USER_FRAGMENT}
`