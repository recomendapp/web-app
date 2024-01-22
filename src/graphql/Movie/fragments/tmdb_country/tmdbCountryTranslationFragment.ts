import { gql } from '@apollo/client';

export default gql`
  fragment TmdbCountryTranslation on tmdb_country_translation {
    name
  }
`;
