import { gql } from "@apollo/client";
import PLAYLIST_ITEM_FRAGMENT from "@/components/modules/MoviePlaylist/fragments/playlistItemFragment";

export default gql `
  mutation insertPlaylistItem(
    $playlist_id: BigInt!
    $film_id: BigInt!
    $user_id: UUID!
    $comment: String
    $rank: Int!
  ) {
    insertIntoplaylist_itemCollection(
      objects: {
        playlist_id: $playlist_id
        film_id: $film_id
        user_id: $user_id
        comment: $comment
        rank: $rank
      }
    ) {
      records {
        ...PlaylistItem
      }
    }
  }
  ${PLAYLIST_ITEM_FRAGMENT}
`