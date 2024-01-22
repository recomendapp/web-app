import { gql } from '@apollo/client';
import TMDB_MOVIE_TRANSLATION_FRAGMENT from '@/graphql/Movie/fragments/tmdb_movie/tmdbMovieTranslationFragment';
import TMDB_MOVIE_VIDEO_FRAGMENT from '@/graphql/Movie/fragments/tmdb_movie/tmdbMovieVideoFragment';
import TMDB_COUNTRY_FRAGMENT from '@/graphql/Movie/fragments/tmdb_country/tmdbCountryFragment';
import TMDB_COLLECTION_FRAGMENT from '@/graphql/Movie/fragments/tmdb_collection/tmdbCollectionFragment';
import TMDB_GENRE_FRAGMENT from '@/graphql/Movie/fragments/tmdb_genre/tmdbGenreFragment';
import TMDB_LANGUAGE_FRAGMENT from '@/graphql/Movie/fragments/tmdb_language/tmdbLanguageFragment';
import TMDB_MOVIE_CREDIT_FRAGMENT from '@/graphql/Movie/fragments/tmdb_movie/tmdbMovieCreditFragment';

export default gql`
  fragment TmdbMovieMinimal on tmdb_movie {
    id
    adult
    backdrop_path
    belongs_to_collection: tmdb_collection {
      ...TmdbCollection
    }
    budget
    homepage
    imdb_id
    original_language
    original_title
    popularity
    release_date
    revenue
    runtime
    status
    vote_average
    vote_count
    data: tmdb_movie_translationCollection(
      filter: { language_id: { eq: $locale } }
      first: 1
    ) {
      edges {
        node {
          ...TmdbMovieTranslation
        }
      }
    }
    directors: tmdb_movie_creditsCollection(
      filter: { job: { eq: "Director" } }
    ) {
      edges {
        node {
          ...TmdbMovieCredit
        }
      }
    }
    genres: tmdb_movie_genreCollection {
      edges {
        node {
          genre_id
          genre: tmdb_genre {
            ...TmdbGenre
          }
        }
      }
    }
    spoken_languages: tmdb_movie_languageCollection {
      edges {
        node {
          language_id
          language: tmdb_language {
            ...TmdbLanguage
          }
        }
      }
    }
  }
  ${TMDB_MOVIE_TRANSLATION_FRAGMENT}
  ${TMDB_COLLECTION_FRAGMENT}
  ${TMDB_GENRE_FRAGMENT}
  ${TMDB_LANGUAGE_FRAGMENT}
  ${TMDB_MOVIE_CREDIT_FRAGMENT}
`;
