import { gql } from "@apollo/client";
import FILM_LIKE_FRAGMENT from "@/components/Film/FilmAction/fragments/filmLikeFragment";

export default gql`
    query Likes($user_id: UUID!){
        like: film_likeCollection(
            filter: {
                user_id: { eq: $user_id }
            }
            orderBy: {
              created_at: DescNullsFirst
            }
        ) {
            edges {
                item: node {
                    ...FilmLike
                }
            }
        }
    }
    ${FILM_LIKE_FRAGMENT}
`