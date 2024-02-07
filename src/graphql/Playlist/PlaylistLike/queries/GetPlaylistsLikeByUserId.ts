import { gql } from '@apollo/client';
import PLAYLIST_MINIMAL_FRAGMENT from '@/graphql/Playlist/Playlist/fragments/PlaylistMinimal';

export default gql`
  query GetPlaylistsLikeByUserId(
    $user_id: UUID!
    $order: [playlist_likeOrderBy!]
    $first: Int!
    $after: Cursor!
  ) {
    playlist_likeCollection(
      filter: { user_id: { eq: $user_id } }
      orderBy: $order
      first: $first
      after: $after
    ) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        endCursor
      }
      edges {
        cursor
        node {
          id
          playlist {
            ...PlaylistMinimal
          }
        }
      }
    }
  }
  ${PLAYLIST_MINIMAL_FRAGMENT}
`;
