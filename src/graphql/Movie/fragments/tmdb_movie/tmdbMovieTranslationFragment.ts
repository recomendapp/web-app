import { gql } from '@apollo/client';

export default gql`
  fragment TmdbMovieTranslation on tmdb_movie_translation {
    title
    overview
    poster_path
    tagline
  }
`;
