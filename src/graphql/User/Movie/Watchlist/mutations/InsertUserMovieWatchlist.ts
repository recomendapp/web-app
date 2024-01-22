import { gql } from '@apollo/client';
import USER_MOVIE_WATCHLIST_MINIMAL_FRAGMENT from '@/graphql/User/Movie/Watchlist/fragments/UserMovieWatchlistMinimal';

export default gql`
  mutation InsertUserMovieWatchlist($movie_id: BigInt!, $user_id: UUID!) {
    insertIntouser_movie_watchlistCollection(
      objects: { movie_id: $movie_id, user_id: $user_id }
    ) {
      records {
        ...UserMovieWatchlistMinimal
      }
    }
  }
  ${USER_MOVIE_WATCHLIST_MINIMAL_FRAGMENT}
`;
