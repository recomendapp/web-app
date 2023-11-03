import { gql } from "@apollo/client";
import USER_FRAGMENT from "@/context/AuthContext/fragments/userFragment";
import PLAYLIST_ITEM_FRAGMENT from "@/components/modules/MoviePlaylist/fragments/playlistItemFragment";
import PLAYLIST_GUEST_FRAGMENT from "@/components/modules/MoviePlaylist/fragments/playlistGuestFragment";

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
        playlist_item: playlist_itemCollection(
            filter: { playlist_id: { eq: $id }}
            orderBy: { rank: AscNullsLast }
        ) {
            edges {
                item: node {
                    ...PlaylistItem
                }
            }
        }
        guests: playlist_guestCollection(
            filter: { playlist_id: {eq: $id}}
        ) {
            edges {
                guest: node {
                    ...PlaylistGuest
                }
            }
        }
    }
    ${USER_FRAGMENT}
    ${PLAYLIST_ITEM_FRAGMENT}
    ${PLAYLIST_GUEST_FRAGMENT}
`