import { gql } from '@apollo/client';

export default gql`
  query GetPlaylistLikeByPlaylistId($playlist_id: BigInt!, $user_id: UUID!) {
    playlist_likeCollection(filter: { playlist_id: { eq: $playlist_id }, user_id: { eq: $user_id } }) {
      edges {
        node {
          id
        }
      }
    }
  }
`;
