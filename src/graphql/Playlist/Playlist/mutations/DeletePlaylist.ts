import { gql } from '@apollo/client';
import PLAYLIST_MINIMAL_FRAGMENT from '@/graphql/Playlist/Playlist/fragments/PlaylistMinimal';

export default gql`
  mutation DeletePlaylist($id: BigInt!) {
    deleteFromplaylistCollection(filter: { id: { eq: $id } }) {
      records {
        ...PlaylistMinimal
      }
    }
  }
  ${PLAYLIST_MINIMAL_FRAGMENT}
`;
