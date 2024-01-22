import { gql } from '@apollo/client';

export default gql`
  fragment TmdbGenderTranslation on tmdb_gender_translation {
    name
  }
`;
