import { gql } from "@apollo/client";
import PLAYLIST_GUEST_FRAGMENT from "@/components/Playlist/FilmPlaylist/PlaylistGuest/fragments/playlistGuestFragment";

export default gql `
  mutation insertPlaylistGuest(
    $playlist_id: BigInt!,
    $user_id: UUID!,
  ) {
    insertIntoplaylist_guestCollection(objects: {
		playlist_id: $playlist_id,
    	user_id: $user_id,
    }) {
		records {
			...PlaylistGuest
		}
    }
  }
  ${PLAYLIST_GUEST_FRAGMENT}
`