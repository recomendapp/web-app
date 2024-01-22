import { gql } from '@apollo/client';
import TMDB_GENDER_TRANSLATION_FRAGMENT from '@/graphql/Movie/fragments/tmdb_gender/tmdbGenderTranslationFragment';

export default gql`
  fragment TmdbGender on tmdb_gender {
    id
    data: tmdb_gender_translationCollection(
      filter: { language: { eq: $locale } }
      first: 1
    ) {
      edges {
        node {
          ...TmdbGenderTranslation
        }
      }
    }
  }
  ${TMDB_GENDER_TRANSLATION_FRAGMENT}
`;
