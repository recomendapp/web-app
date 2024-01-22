import { gql } from '@apollo/client';
import PLAYLIST_MINIMAL_FRAGMENT from '@/graphql/Playlist/Playlist/fragments/PlaylistMinimal';

export default gql`
  mutation UpdatePlaylist(
    $id: BigInt!
    $title: String!
    $description: String!
    $is_public: Boolean!
    $poster_url: String!
  ) {
    updateplaylistCollection(
      filter: { id: { eq: $id } }
      set: {
        title: $title
        description: $description
        is_public: $is_public
        poster_url: $poster_url
      }
    ) {
      records {
        ...PlaylistMinimal
      }
    }
  }
  ${PLAYLIST_MINIMAL_FRAGMENT}
`;
