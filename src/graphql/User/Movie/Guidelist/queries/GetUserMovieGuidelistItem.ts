import { gql } from '@apollo/client';
import USER_MOVIE_GUIDELIST_ITEM_FRAGMENT from '@/graphql/User/Movie/Guidelist/fragments/UserMovieGuidelistItem';

export default gql`
  query GetUserMovieGuidelistItem($filter: user_movie_guidelist_itemFilter!) {
    user_movie_guidelist_itemCollection(
      filter: $filter
    ) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        endCursor
      }
      edges {
        node {
          ...UserMovieGuidelistItem
        }
      }
    }
  }
  ${USER_MOVIE_GUIDELIST_ITEM_FRAGMENT}
`;
