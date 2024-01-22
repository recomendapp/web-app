import { gql } from '@apollo/client';
import PLAYLIST_ITEM_FRAGMENT from '@/graphql/Playlist/PlaylistItem/fragments/PlaylistItem';

export default gql`
  mutation InsertPlaylistItem(
    $playlist_id: BigInt!
    $movie_id: BigInt!
    $user_id: UUID!
    $comment: String
    $rank: Int!
    $locale: String!
  ) {
    insertIntoplaylist_itemCollection(
      objects: {
        playlist_id: $playlist_id
        movie_id: $movie_id
        user_id: $user_id
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
