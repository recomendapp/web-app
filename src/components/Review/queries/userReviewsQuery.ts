import { gql } from '@apollo/client';
import USER_MOVIE_REVIEW_FRAGMENT from '@/graphql/User/Movie/Review/fragments/UserMovieReview';

export default gql`
  query UserReviewsQuery($movie_id: BigInt!, $first: Int!, $after: Cursor!) {
    user_movie_reviewCollection(
      filter: { movie_id: { eq: $movie_id } }
      first: $first
      after: $after
    ) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        endCursor
      }
      edges {
        cursor
        node {
          ...UserMovieReview
        }
      }
    }
  }
  ${USER_MOVIE_REVIEW_FRAGMENT}
`;
