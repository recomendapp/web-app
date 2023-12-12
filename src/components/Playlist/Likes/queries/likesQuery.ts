import { gql } from "@apollo/client";
import FILM_LIKE_FRAGMENT from "@/components/Film/FilmAction/fragments/filmLikeFragment";

export default gql`
    query MovieActivity(
        $filter: user_movie_activityFilter!
    ){
        like: user_movie_activityCollection(
            filter: {
                user_id: { eq: $user_id }
                is_liked: { eq: true }
            }
            orderBy: {
                created_at: DescNullsLast
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