import { gql } from '@apollo/client';
import PLAYLIST_FRAGMENT from '@/graphql/Playlist/Playlist/fragments/Playlist';

export default gql`
  query GetPlaylistById($id: BigInt!, $locale: String!) {
    playlistCollection(filter: { id: { eq: $id } }) {
      edges {
        node {
          ...Playlist
        }
      }
    }
  }
  ${PLAYLIST_FRAGMENT}
`;
