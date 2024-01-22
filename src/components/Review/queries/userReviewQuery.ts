import { gql } from '@apollo/client';
import USER_MOVIE_REVIEW_FRAGMENT from '@/graphql/User/Movie/Review/fragments/UserMovieReview';

export default gql`
  query UserReviewQuery($movie_id: BigInt!, $user_id: UUID!) {
    user_movie_reviewCollection(
      filter: { movie_id: { eq: $movie_id }, user_id: { eq: $user_id } }
    ) {
      edges {
        node {
          ...UserMovieReview
        }
      }
    }
  }
  ${USER_MOVIE_REVIEW_FRAGMENT}
`;
