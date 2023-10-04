import { gql } from "@apollo/client";
import PLAYLIST_FRAGMENT from '@/components/modules/MoviePlaylist/fragments/playlistFragment'

export default gql`
    query SearchPlaylists(
        $search: String
        $order: [playlistOrderBy!]
        $first: Int!
        $after: Cursor!
    ) {
    playlistCollection(
        filter: {
            title: { iregex: $search }
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