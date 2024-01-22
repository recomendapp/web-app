import { gql } from '@apollo/client';
import TMDB_MOVIE_MINIMAL_FRAGMENT from '@/graphql/Movie/fragments/tmdb_movie/minimal/tmdbMovieMinimalFragment';

export default gql`
  query SearchMovies($filter: tmdb_movie_translationFilter!, $first: Int!, $after: Cursor!, $locale: String!) {
    tmdb_movie_translationCollection(filter: $filter, first: $first, after: $after, orderBy: {}) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        endCursor
      }
      edges {
        cursor
        node {
          id
          movie: tmdb_movie {
            ...TmdbMovieMinimal
          }
        }
      }
    }
  }
  ${TMDB_MOVIE_MINIMAL_FRAGMENT}
`;
