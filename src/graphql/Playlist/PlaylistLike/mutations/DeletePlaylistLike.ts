import { gql } from '@apollo/client';

export default gql`
  mutation DeletePlaylistLike($playlist_id: BigInt!, $user_id: UUID!) {
    deleteFromplaylist_likeCollection(
      filter: { playlist_id: { eq: $playlist_id }, user_id: { eq: $user_id } }
    ) {
      records {
        id
      }
    }
  }
`;
