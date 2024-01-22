import { gql } from '@apollo/client';
import USER_MOVIE_WATCHLIST_MINIMAL_FRAGMENT from '@/graphql/User/Movie/Watchlist/fragments/UserMovieWatchlistMinimal';

export default gql`
  mutation DeleteUserMovieWatchlist($movie_id: BigInt!, $user_id: UUID!) {
    deleteFromuser_movie_watchlistCollection(
      filter: { movie_id: { eq: $movie_id }, user_id: { eq: $user_id } }
    ) {
      records {
        ...UserMovieWatchlistMinimal
      }
    }
  }
  ${USER_MOVIE_WATCHLIST_MINIMAL_FRAGMENT}
`;
