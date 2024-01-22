import { gql } from '@apollo/client';
import PLAYLIST_MINIMAL_FRAGMENT from '@/graphql/Playlist/Playlist/fragments/PlaylistMinimal';

export default gql`
  query GetPlaylistsByUserId(
    $user_id: UUID!
    $order: [playlistOrderBy!]
    $first: Int!
    $after: Cursor!
  ) {
    playlistCollection(
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
          ...PlaylistMinimal
        }
      }
    }
  }
  ${PLAYLIST_MINIMAL_FRAGMENT}
`;
