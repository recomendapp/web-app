import { gql } from '@apollo/client';
import USER_MINIMAL_FRAGMENT from '@/graphql/User/User/fragments/UserMinimal';

export default gql`
  fragment UserMovieReview on user_movie_review {
    id
    created_at
    updated_at
    user_id
    user {
      ...UserMinimal
    }
    movie_id
    title
    body
    likes_count
    comments_count
    views_count
  }
  ${USER_MINIMAL_FRAGMENT}
`;
