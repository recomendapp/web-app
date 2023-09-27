import { gql } from "@apollo/client";

export default gql`
    fragment Film on film {
        id,
        title,
        release_date
        poster_path: poster_url
    }
`

// fragment Film on film {
//     id
//     created_at
//     title
//     adult
//     backdrop_path
//     original_language
//     original_title
//     overview
//     popularity
//     poster_path
//     release_date
// }