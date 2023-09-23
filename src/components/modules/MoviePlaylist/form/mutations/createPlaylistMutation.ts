import PLAYLIST_FRAGMENT from "@/components/modules/MoviePlaylist/fragments/playlistFragment";
import { gql } from "@apollo/client";

export default gql `
  mutation createPlaylistMutation(
    $user_id: UUID!,
    $title: String!,
    $description: String!,
    $is_public: Boolean!
  ) {
    insertIntoplaylistCollection(
      objects: {
        user_id: $user_id,
        title: $title,
        description: $description,
        is_public: $is_public
      }
    ) {
      records {
        ...Playlist
      }
    }
  }
  ${PLAYLIST_FRAGMENT}
`