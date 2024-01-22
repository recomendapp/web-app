import { gql } from '@apollo/client';
import PLAYLIST_MINIMAL_FRAGMENT from '@/graphql/Playlist/Playlist/fragments/PlaylistMinimal';

export default gql`
  mutation CreatePlaylist(
    $id: BigInt!
    $user_id: UUID!
    $title: String!
    $description: String!
    $is_public: Boolean!
    $locale: String!
  ) {
    insertIntoplaylistCollection(
      objects: {
        user_id: $user_id
        title: $title
        description: $description
        is_public: $is_public
      }
    ) {
      records {
        ...PlaylistMinimal
      }
    }
  }
  ${PLAYLIST_MINIMAL_FRAGMENT}
`;
