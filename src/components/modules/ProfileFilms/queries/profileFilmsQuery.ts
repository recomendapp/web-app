import { gql } from "@apollo/client";
import PLAYLIST_FRAGMENT from '@/components/modules/MoviePlaylist/fragments/playlistFragment'
import FILM_ACTION_FRAGMENT from "@/components/modules/MovieAction/fragments/filmActionFragment";

export default gql`
    query ProfileFilms(
        $user_id: UUID!
        $order: [film_actionOrderBy!]
        $first: Int
        $after: Cursor
    ) {
        film_actionCollection(
            filter: {
                user_id: { eq: $user_id }
            }
            orderBy: $order
            first: $first
            after: $after
        ) {
            pageInfo {
                hasNextPage
                endCursor
            }
            edges {
                film_action: node {
                    ...FilmAction
                }
            }
        }
    }
    ${FILM_ACTION_FRAGMENT}
`