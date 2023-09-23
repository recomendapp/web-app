import { gql } from "@apollo/client";
import PLAYLIST_FRAGMENT from '@/components/modules/MoviePlaylist/fragments/playlistFragment'

export default gql`
    query UserPlaylistsQuery($id: UUID!) {
        playlistCollection(filter: { user_id: { eq: $id }}) {
            edges {
                node {
                    ...Playlist
                }
            }
        }
    }
    ${PLAYLIST_FRAGMENT}
`