import { gql } from '@apollo/client';
import TMDB_MOVIE_MINIMAL_FRAGMENT from '@/graphql/Movie/fragments/tmdb_movie/minimal/tmdbMovieMinimalFragment';

export default gql`
  fragment UserMovieWatchlist on user_movie_watchlist {
    id
    created_at
    user_id
    movie_id
    movie: tmdb_movie {
      ...TmdbMovieMinimal
    }
  }
  ${TMDB_MOVIE_MINIMAL_FRAGMENT}
`;
