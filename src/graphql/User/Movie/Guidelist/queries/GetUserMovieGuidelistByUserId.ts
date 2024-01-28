import { gql } from '@apollo/client';
import USER_MOVIE_GUIDELIST_FRAGMENT from '@/graphql/User/Movie/Guidelist/fragments/UserMovieGuidelist';

export default gql`
  query GetUserMovieGuidelistByUserId($user_id: UUID!, $locale: String!) {
    user_movie_guidelistCollection(
      filter: { user_id: { eq: $user_id } }
    ) {
      edges {
        node {
          ...UserMovieGuidelist
        }
      }
    }
  }
  ${USER_MOVIE_GUIDELIST_FRAGMENT}
`;
