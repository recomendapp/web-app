import { gql } from "@apollo/client";
import PLAYLIST_GUEST_FRAGMENT from "@/components/Playlist/FilmPlaylist/PlaylistGuest/fragments/playlistGuestFragment";

export default gql `
  mutation updatePlaylistGuest(
	$playlist_id: BigInt!,
    $user_id: UUID!,
    $edit: Boolean!,
  ) {
    updateplaylist_guestCollection(filter: {
		playlist_id: { eq: $playlist_id }
		user_id: { eq: $user_id }
	}, set: {
		edit: $edit
	}) {
		records {
		  ...PlaylistGuest
		}
	}
  }
  ${PLAYLIST_GUEST_FRAGMENT}
`