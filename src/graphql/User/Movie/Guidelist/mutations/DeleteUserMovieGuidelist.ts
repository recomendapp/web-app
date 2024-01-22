import { gql } from '@apollo/client';
import USER_MOVIE_GUIDELIST_FRAGMENT from '@/graphql/User/Movie/Guidelist/fragments/UserMovieGuidelist';

export default gql`
  mutation DeleteUserMovieGuidelist($id: BigInt!, $locale: String!) {
    deleteFromuser_movie_guidelistCollection(filter: { id: { eq: $id } }) {
      records {
        ...UserMovieGuidelist
      }
    }
  }
  ${USER_MOVIE_GUIDELIST_FRAGMENT}
`;
