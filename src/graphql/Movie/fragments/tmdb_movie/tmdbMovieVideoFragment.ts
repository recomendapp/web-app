import { gql } from '@apollo/client';

export default gql`
  fragment TmdbMovieVideo on tmdb_movie_videos {
    name
    key
    site
    size
    type
    official
  }
`;
