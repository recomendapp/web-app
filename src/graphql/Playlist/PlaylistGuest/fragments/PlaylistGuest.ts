import { gql } from '@apollo/client';
import USER_FRAGMENT from '@/graphql/User/User/fragments/User';

export default gql`
  fragment PlaylistGuest on playlist_guest {
    id
    created_at
    playlist_id
    user_id
    user {
      ...User
    }
    edit
  }
  ${USER_FRAGMENT}
`;
