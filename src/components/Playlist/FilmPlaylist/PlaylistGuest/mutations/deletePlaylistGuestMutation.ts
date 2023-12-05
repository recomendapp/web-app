import { gql } from "@apollo/client";
import PLAYLIST_GUEST_FRAGMENT from "@/components/Playlist/FilmPlaylist/PlaylistGuest/fragments/playlistGuestFragment";

export default gql `
  mutation deletePlaylistGuest(
    $playlist_id: BigInt!,
    $user_id: UUID!,
  ) {
    deleteFromplaylist_guestCollection(filter: {
      playlist_id: { eq: $playlist_id },
      user_id: { eq: $user_id }
    }){
      records {
        ...PlaylistGuest
      }
    }
  }
  ${PLAYLIST_GUEST_FRAGMENT}
`