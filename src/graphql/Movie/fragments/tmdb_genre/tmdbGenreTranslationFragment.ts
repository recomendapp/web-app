import { gql } from '@apollo/client';

export default gql`
  fragment TmdbGenreTranslation on tmdb_genre_translation {
    name
  }
`;
