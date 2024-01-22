import { gql } from '@apollo/client';
import TMDB_MOVIE_MINIMAL_FRAGMENT from '@/graphql/Movie/fragments/tmdb_movie/minimal/tmdbMovieMinimalFragment';

export default gql`
  fragment UserMovieWatchlistMinimal on user_movie_watchlist {
    id
    created_at
    user_id
    movie_id
  }
`;
