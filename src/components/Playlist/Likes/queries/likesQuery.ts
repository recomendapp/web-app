import { gql } from "@apollo/client";
import FILM_ACTION_FRAGMENT from "@/components/Film/FilmAction/fragments/filmActionFragment";

export default gql`
    query Likes($user_id: UUID!){
        film_actionCollection(
            filter: {
                user_id: { eq: $user_id }
                is_liked: { eq: true }
            }
            orderBy: {
              updated_at: DescNullsFirst
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