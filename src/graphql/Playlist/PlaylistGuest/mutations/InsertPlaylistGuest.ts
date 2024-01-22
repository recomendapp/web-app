import { gql } from '@apollo/client';
import PLAYLIST_GUEST_FRAGMENT from '@/graphql/Playlist/PlaylistGuest/fragments/PlaylistGuest';

export default gql`
  mutation InsertPlaylistGuest($playlist_id: BigInt!, $user_id: UUID!) {
    insertIntoplaylist_guestCollection(
      objects: { playlist_id: $playlist_id, user_id: $user_id }
    ) {
      records {
        ...PlaylistGuest
      }
    }
  }
  ${PLAYLIST_GUEST_FRAGMENT}
`;
