import { gql } from "@apollo/client";
import USER_MOVIE_ACTIVITY_FRAGMENT from "@/components/Film/FilmAction/fragments/userMovieActivityFragment";

export default gql`
    query UserMovieActivity(
        $filter: user_movie_activityFilter!
		$orderBy: [user_movie_activityOrderBy!]
    ){
        user_movie_activityCollection(
            filter: $filter
            orderBy: $orderBy
        ) {
            edges {
                node {
                    ...UserMovieActivity
                }
            }
        }
    }
    ${USER_MOVIE_ACTIVITY_FRAGMENT}
`