import { gql } from "@apollo/client";

export default gql`
    fragment FilmRating on film_rating {
        id
        created_at
        updated_at
        film_id
        user_id
        rating
    }
`