import { gql } from "@apollo/client";
import FILM_ACTION_FRAGMENT from "@/components/Film/FilmAction/fragments/filmActionFragment";

export default gql`
    query Watchlist($user_id: UUID!){
        film_actionCollection(
            filter: {
                user_id: { eq: $user_id }
                is_watchlisted: { eq: true }
            }
        ) {
            edges {
                item: node {
                    ...FilmAction
                }
            }
        }
    }
    ${FILM_ACTION_FRAGMENT}
`