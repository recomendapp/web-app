import { gql } from '@apollo/client';

export default gql`
  fragment TmdbCollectionTranslation on tmdb_collection_translation {
    title
    overview
    homepage
  }
`;
