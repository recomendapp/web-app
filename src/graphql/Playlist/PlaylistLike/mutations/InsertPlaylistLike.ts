import { gql } from '@apollo/client';

export default gql`
  mutation InsertPlaylistLike($playlist_id: BigInt!, $user_id: UUID!) {
    insertIntoplaylist_likeCollection(
      objects: { playlist_id: $playlist_id, user_id: $user_id }
    ) {
      records {
        id
      }
    }
  }
`;
