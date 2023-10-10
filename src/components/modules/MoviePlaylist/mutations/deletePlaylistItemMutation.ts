import PLAYLIST_FRAGMENT from "@/components/modules/MoviePlaylist/fragments/playlistFragment";
import { gql } from "@apollo/client";
import PLAYLIST_ITEM_FRAGMENT from "@/components/modules/MoviePlaylist/fragments/playlistItemFragment";

export default gql `
  mutation deletePlaylistItemMutation(
    $id: BigInt!,
  ) {
    deleteFromplaylist_itemCollection(
      filter: { id: { eq: $id } }
    ) {
      records {
        ...PlaylistItem
      }
    }
  }
  ${PLAYLIST_ITEM_FRAGMENT}
`