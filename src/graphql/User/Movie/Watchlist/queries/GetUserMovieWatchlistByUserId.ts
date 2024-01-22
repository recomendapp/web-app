import { gql } from '@apollo/client';
import USER_MOVIE_WATCHLIST_FRAGMENT from '@/graphql/User/Movie/Watchlist/fragments/UserMovieWatchlist';

export default gql`
  query GetUserMovieWatchlistByUserId($user_id: UUID!, $locale: String!) {
    user_movie_watchlistCollection(
      filter: {
        user_id: { eq: $user_id }
      }
    ) {
      edges {
        node {
          ...UserMovieWatchlist
        }
      }
    }
  }
  ${USER_MOVIE_WATCHLIST_FRAGMENT}
`;
