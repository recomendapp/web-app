import { gql } from "@apollo/client";

export default gql`
    fragment FilmWatch on film_watch {
        id
        created_at
        updated_at
        film_id
        user_id
        date
    }
`