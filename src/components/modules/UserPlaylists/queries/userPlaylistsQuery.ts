import { gql } from "@apollo/client";
import PLAYLIST_FRAGMENT from '@/components/modules/MoviePlaylist/fragments/playlistFragment'

export default gql`
    query UserPlaylists(
        $user_id: UUID!
        $order: [playlistOrderBy!]
        $first: Int!
        $after: Cursor!
    ) {
        playlistCollection(
            filter: {
                user_id: { eq: $user_id }
            }
            orderBy: $order
            first: $first
            after: $after
        ) {
            pageInfo {
                hasNextPage
                hasPreviousPage
                endCursor
            }
            edges {
                cursor
                playlist: node {
                    ...Playlist
                }
            }
        }
    }
    ${PLAYLIST_FRAGMENT}
`