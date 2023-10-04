import { gql } from "@apollo/client";
import FILM_ACTION_FRAGMENT from "@/components/Film/FilmAction/fragments/filmActionFragment";

export default gql`
    query FilmActionQuery($film_id: BigInt!, $user_id: UUID!) {
        film_actionCollection(filter: { film_id: { eq: $film_id }, user_id: { eq: $user_id }}) {
            edges {
                action: node {
                    ...FilmAction
                }
            }
        }
    }
    ${FILM_ACTION_FRAGMENT}
`