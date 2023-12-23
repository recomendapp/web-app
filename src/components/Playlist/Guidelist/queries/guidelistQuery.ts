import { gql } from "@apollo/client";
import USER_MOVIE_GUIDELIST_FRAGMENT from "@/components/Playlist/Guidelist/fragments/userMovieGuidelistFragment";

export default gql`
    query GuidelistQuery($user_id: UUID!){
        user_movie_guidelistCollection(filter: { receiver_user_id: { eq: $user_id }}) {
            edges {
                item: node {
                    ...UserMovieGuidelist
                }
            }
        }
    }
    ${USER_MOVIE_GUIDELIST_FRAGMENT}
`