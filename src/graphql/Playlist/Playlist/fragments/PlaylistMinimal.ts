import { gql } from '@apollo/client';
import USER_FRAGMENT from '@/graphql/User/User/fragments/User';
import PLAYLIST_ITEM_FRAGMENT from '@/graphql/Playlist/PlaylistItem/fragments/PlaylistItem';
import PLAYLIST_GUEST_FRAGMENT from '@/graphql/Playlist/PlaylistGuest/fragments/PlaylistGuest';

export default gql`
  fragment PlaylistMinimal on playlist {
    id
    created_at
    user_id
    user {
      ...User
    }
    title
    description
    is_public
    poster_url
    items_count
    featured
  }
  ${USER_FRAGMENT}
`;
