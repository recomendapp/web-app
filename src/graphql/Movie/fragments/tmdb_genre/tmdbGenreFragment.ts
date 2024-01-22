import { gql } from '@apollo/client';
import TMDB_GENRE_TRANSLATION_FRAGMENT from '@/graphql/Movie/fragments/tmdb_genre/tmdbGenreTranslationFragment';

export default gql`
  fragment TmdbGenre on tmdb_genre {
    id
    data: tmdb_genre_translationCollection(
      filter: { language: { eq: $locale } }
      first: 1
    ) {
      edges {
        node {
          ...TmdbGenreTranslation
        }
      }
    }
  }
  ${TMDB_GENRE_TRANSLATION_FRAGMENT}
`;
