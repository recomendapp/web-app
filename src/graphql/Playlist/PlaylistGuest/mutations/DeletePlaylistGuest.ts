import { gql } from '@apollo/client';
import PLAYLIST_GUEST_FRAGMENT from '@/graphql/Playlist/PlaylistGuest/fragments/PlaylistGuest';

export default gql`
  mutation DeletePlaylistGuest($playlist_id: BigInt!, $user_id: UUID!) {
    deleteFromplaylist_guestCollection(
      filter: { playlist_id: { eq: $playlist_id }, user_id: { eq: $user_id } }
    ) {
      records {
        ...PlaylistGuest
      }
    }
  }
  ${PLAYLIST_GUEST_FRAGMENT}
`;
