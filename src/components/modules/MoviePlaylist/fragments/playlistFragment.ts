import { gql } from "@apollo/client";

export default gql`
    fragment Playlist on playlist {
        id,
        created_at,
        user_id,
        title,
        description,
        is_public,
        poster_url,
    }
`