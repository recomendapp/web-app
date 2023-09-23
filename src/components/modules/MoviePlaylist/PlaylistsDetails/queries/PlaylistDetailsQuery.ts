import { gql } from "@apollo/client";
import PLAYLIST_FRAGMENT from '@/components/modules/MoviePlaylist/fragments/playlistFragment';

export default gql`
    query PlaylistDetailsQuery($id: BigInt!) {
        playlistCollection(filter: { id: {eq: $id}}) {
            edges {
                node {
                    ...Playlist
                }
            }
        }
    }
    ${PLAYLIST_FRAGMENT}
`