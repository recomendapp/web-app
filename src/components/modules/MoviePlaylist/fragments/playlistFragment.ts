import { gql } from "@apollo/client";
import USER_FRAGMENT from "@/context/AuthContext/fragments/userFragment";
import PLAYLIST_ITEM_FRAGMENT from "@/components/modules/MoviePlaylist/fragments/playlistItemFragment";

export default gql`
    fragment Playlist on playlist {
        id
        created_at
        user_id
        user {
            ...User
        }
        title
        description
        is_public
        poster_url
        items_count
        playlist_item: playlist_itemCollection(filter: { playlist_id: { eq: $id }}) {
            edges {
                item: node {
                    ...PlaylistItem
                }
            }
        }
    }
    ${USER_FRAGMENT}
    ${PLAYLIST_ITEM_FRAGMENT}
`