import { gql } from '@apollo/client';
import USER_MOVIE_REVIEW_FRAGMENT from '@/graphql/User/Movie/Review/fragments/UserMovieReview';

export default gql`
  mutation InsertReview(
    $movie_id: BigInt!
    $user_id: UUID!
    $title: String!
    $body: String!
  ) {
    insertIntouser_movie_reviewCollection(
      objects: {
        movie_id: $movie_id
        user_id: $user_id
        title: $title
        body: $body
      }
    ) {
      records {
        ...UserMovieReview
      }
    }
  }
  ${USER_MOVIE_REVIEW_FRAGMENT}
`;
