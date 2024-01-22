import { gql } from '@apollo/client';

export default gql`
  fragment TmdbLanguageTranslation on tmdb_language_translation {
    name
  }
`;
