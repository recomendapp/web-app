import { gql } from '@apollo/client';
import TMDB_LANGUAGE_TRANSLATION_FRAGMENT from '@/graphql/Movie/fragments/tmdb_language/tmdbLanguageTranslationFragment';

export default gql`
  fragment TmdbLanguage on tmdb_language {
    iso_639_1
    name_in_native_language
    data: tmdb_language_translationCollection(
      filter: { language: { eq: $locale } }
      first: 1
    ) {
      edges {
        node {
          ...TmdbLanguageTranslation
        }
      }
    }
  }
  ${TMDB_LANGUAGE_TRANSLATION_FRAGMENT}
`;
