import { gql } from '@apollo/client';
import USER_MOVIE_REVIEW_FRAGMENT from '@/graphql/User/Movie/Review/fragments/UserMovieReview';

export default gql`
  mutation UpdateReview($id: BigInt!, $title: String!, $body: String!) {
    updateuser_movie_reviewCollection(
      filter: { id: { eq: $id } }
      set: { title: $title, body: $body }
    ) {
      records {
        ...UserMovieReview
      }
    }
  }
  ${USER_MOVIE_REVIEW_FRAGMENT}
`;
