import { gql } from '@apollo/client';
import PLAYLIST_ITEM_FRAGMENT from '@/graphql/Playlist/PlaylistItem/fragments/PlaylistItem';

export default gql`
  mutation UpdatePlaylistItem(
    $id: BigInt!
    $comment: String
    $rank: Int!
    $locale: String!
  ) {
    updateplaylist_itemCollection(
      filter: { id: { eq: $id } }
      set: {
        comment: $comment
        rank: $rank
      }
    ) {
      records {
        ...PlaylistItem
      }
    }
  }
  ${PLAYLIST_ITEM_FRAGMENT}
`;
