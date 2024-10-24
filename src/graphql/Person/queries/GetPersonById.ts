import { gql } from '@apollo/client';
import TMDB_PERSON_FRAGMENT from '@/graphql/Movie/fragments/tmdb_person/tmdbPersonFragment';
import TMDB_MOVIE_MINIMAL_FRAGMENT from '@/graphql/Movie/fragments/tmdb_movie/minimal/tmdbMovieMinimalFragment';
import { PersonFragment } from '../fragments/Person';

export const GET_PERSON_BY_ID = gql`
  query GetPersonById($filter: personFilter, $locale: String) {
    personCollection(filter: $filter) {
      edges {
        node {
          ...PersonFragment
          credits: tmdb_movie_creditsCollection {
            edges {
              node {
                id
              }
            }
          }
        }
      }
    }
  }
  ${PersonFragment}
`;
