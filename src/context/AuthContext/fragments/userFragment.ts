import { gql } from "@apollo/client";

export default gql`
    fragment User on user {
        id
        updated_at
        username
        username_updated_at
        full_name
        bio
        avatar_url
        website
        language
        favorite_color
        followers_count
        following_count
        friends_count
    }
`