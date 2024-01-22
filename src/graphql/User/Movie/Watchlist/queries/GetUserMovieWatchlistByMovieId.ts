import { gql } from '@apollo/client';
import USER_MOVIE_WATCHLIST_MINIMAL_FRAGMENT from '@/graphql/User/Movie/Watchlist/fragments/UserMovieWatchlistMinimal';

export default gql`
  query GetUserMovieWatchlistByMovieId($user_id: UUID!, $movie_id: BigInt!) {
    user_movie_watchlistCollection(
      filter: { user_id: { eq: $user_id }, movie_id: { eq: $movie_id } }
    ) {
      edges {
        node {
          ...UserMovieWatchlistMinimal
        }
      }
    }
  }
  ${USER_MOVIE_WATCHLIST_MINIMAL_FRAGMENT}
`;
