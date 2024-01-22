import PLAYLIST_FRAGMENT from '@/graphql/Playlist/Playlist/fragments/Playlist';
import { gql } from '@apollo/client';
import PLAYLIST_ITEM_FRAGMENT from '@/graphql/Playlist/PlaylistItem/fragments/PlaylistItem';

export default gql`
  mutation deletePlaylistItemMutation($id: BigInt!) {
    deleteFromplaylist_itemCollection(filter: { id: { eq: $id } }) {
      affectedCount
      records {
        ...PlaylistItem
      }
    }
  }
  ${PLAYLIST_ITEM_FRAGMENT}
`;
