import { gql } from '@apollo/client';
import TMDB_PERSON_FRAGMENT from '@/graphql/Movie/fragments/tmdb_person/tmdbPersonFragment';
import TMDB_MOVIE_MINIMAL_FRAGMENT from '@/graphql/Movie/fragments/tmdb_movie/minimal/tmdbMovieMinimalFragment';

export default gql`
  query GetPersonById($filter: tmdb_personFilter, $locale: String) {
    tmdb_personCollection(filter: $filter) {
      edges {
        node {
          ...TmdbPerson
          credits: tmdb_movie_creditsCollection {
            edges {
              node {
                id
                movie: tmdb_movie {
                  ...TmdbMovieMinimal
                }
              }
            }
          }  
        }
      }
    }
  }
  ${TMDB_PERSON_FRAGMENT}
  ${TMDB_MOVIE_MINIMAL_FRAGMENT}
`;
