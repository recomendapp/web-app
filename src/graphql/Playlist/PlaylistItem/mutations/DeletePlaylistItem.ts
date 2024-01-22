import { gql } from '@apollo/client';
import PLAYLIST_ITEM_FRAGMENT from '@/graphql/Playlist/PlaylistItem/fragments/PlaylistItem';

export default gql`
  mutation DeletePlaylistItem(
    $id: BigInt!
    $locale: String!
  ) {
    deleteFromplaylist_itemCollection(
      filter: { id: { eq: $id } }
    ) {
      records {
        ...PlaylistItem
      }
    }
  }
  ${PLAYLIST_ITEM_FRAGMENT}
`;
