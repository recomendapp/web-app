import { gql } from '@apollo/client';
import TMDB_COUNTRY_TRANSLATION_FRAGMENT from '@/graphql/Movie/fragments/tmdb_country/tmdbCountryTranslationFragment';

export default gql`
  fragment TmdbCountry on tmdb_country {
    iso_3166_1
    data: tmdb_country_translationCollection(
      filter: { iso_3166_1: { eq: $locale } }
      first: 1
    ) {
      edges {
        node {
          ...TmdbCountryTranslation
        }
      }
    }
  }
  ${TMDB_COUNTRY_TRANSLATION_FRAGMENT}
`;
