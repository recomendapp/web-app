import { gql } from '@apollo/client';

export default gql`
  fragment TmdbMovieRole on tmdb_movie_role {
    credit_id
    character
    order
  }
`;
