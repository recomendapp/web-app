import { gql } from '@apollo/client';
import USER_MOVIE_REVIEW_FRAGMENT from '@/graphql/User/Movie/Review/fragments/UserMovieReview';

export default gql`
  mutation DeleteReview($id: BigInt!) {
    deleteFromuser_movie_reviewCollection(filter: { id: { eq: $id } }) {
      records {
        ...UserMovieReview
      }
    }
  }
  ${USER_MOVIE_REVIEW_FRAGMENT}
`;
