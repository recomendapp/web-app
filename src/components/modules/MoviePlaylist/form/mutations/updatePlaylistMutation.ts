import PLAYLIST_FRAGMENT from "@/components/modules/MoviePlaylist/fragments/playlistFragment";
import { gql } from "@apollo/client";

export default gql `
  mutation updatePlaylistMutation(
    $id: BigInt!,
    $title: String!,
    $description: String!,
    $poster_url: String!,
  ) {
    updateplaylistCollection(filter: { id: {eq: $id}}, set: {
      title: $title,
      description: $description,
      poster_url: $poster_url,
    }) {
      records {
        ...Playlist
      }
    }
  }
  ${PLAYLIST_FRAGMENT}
`