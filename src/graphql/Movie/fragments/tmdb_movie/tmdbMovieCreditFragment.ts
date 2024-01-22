import { gql } from '@apollo/client';
import TMDB_PERSON_FRAGMENT from '@/graphql/Movie/fragments/tmdb_person/tmdbPersonFragment';
import TMDB_MOVIE_ROLE_FRAGMENT from '@/graphql/Movie/fragments/tmdb_movie/tmdbMovieRoleFragment';

export default gql`
  fragment TmdbMovieCredit on tmdb_movie_credits {
    id
    department
    job
    person: tmdb_person {
      ...TmdbPerson
    }
    role: tmdb_movie_role {
      ...TmdbMovieRole
    }
  }
  ${TMDB_PERSON_FRAGMENT}
  ${TMDB_MOVIE_ROLE_FRAGMENT}
`;
