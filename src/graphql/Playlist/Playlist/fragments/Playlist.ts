import { gql } from '@apollo/client';
import USER_FRAGMENT from '@/graphql/User/User/fragments/User';
import PLAYLIST_ITEM_FRAGMENT from '@/graphql/Playlist/PlaylistItem/fragments/PlaylistItem';
import PLAYLIST_GUEST_FRAGMENT from '@/graphql/Playlist/PlaylistGuest/fragments/PlaylistGuest';

export default gql`
  fragment Playlist on playlist {
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
    playlist_item: playlist_itemCollection(
      filter: { playlist_id: { eq: $id } }
      orderBy: { rank: AscNullsLast }
    ) {
      edges {
        node {
          ...PlaylistItem
        }
      }
    }
    guests: playlist_guestCollection(filter: { playlist_id: { eq: $id } }) {
      edges {
        node {
          ...PlaylistGuest
        }
      }
    }
  }
  ${USER_FRAGMENT}
  ${PLAYLIST_ITEM_FRAGMENT}
  ${PLAYLIST_GUEST_FRAGMENT}
`;
