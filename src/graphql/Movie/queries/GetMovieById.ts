import { gql } from '@apollo/client';
import TMDB_MOVIE_FRAGMENT from '@/graphql/Movie/fragments/tmdb_movie/tmdbMovieFragment';

export const GET_MOVIE_BY_ID = gql`
  query GetMovieById($filter: tmdb_movieFilter, $locale: String) {
    tmdb_movieCollection(filter: $filter) {
      edges {
        node {
          ...TmdbMovie
        }
      }
    }
  }
  ${TMDB_MOVIE_FRAGMENT}
`;
