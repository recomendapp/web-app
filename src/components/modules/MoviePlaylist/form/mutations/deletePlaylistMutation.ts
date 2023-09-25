import PLAYLIST_FRAGMENT from "@/components/modules/MoviePlaylist/fragments/playlistFragment";
import { gql } from "@apollo/client";

export default gql `
  mutation deletePlaylistMutation(
    $id: BigInt!,
  ) {
    deleteFromplaylistCollection(
      filter: { id: { eq: $id } }
    ) {
      records {
        ...Playlist
      }
    }
  }
  ${PLAYLIST_FRAGMENT}
`