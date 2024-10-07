import { gql } from '@apollo/client';
import TMDB_COLLECTION_TRANSLATION_FRAGMENT from '@/graphql/Movie/fragments/tmdb_collection/tmdbCollectionTranslationFragment';

export default gql`
  fragment TmdbCollection on tmdb_collection {
    id
    data: tmdb_collection_translationCollection(
      filter: { iso_639_1: { eq: $locale } }
      first: 1
    ) {
      edges {
        node {
          ...TmdbCollectionTranslation
        }
      }
    }
  }
  ${TMDB_COLLECTION_TRANSLATION_FRAGMENT}
`;
