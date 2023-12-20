import { gql } from "@apollo/client";

export default gql`
    fragment FilmLike on film_like {
        id
        created_at
        film_id
        user_id
    }
`