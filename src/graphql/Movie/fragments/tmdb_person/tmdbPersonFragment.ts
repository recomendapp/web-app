import { gql } from '@apollo/client';
import TMDB_GENDER_FRAGMENT from '@/graphql/Movie/fragments/tmdb_gender/tmdbGenderFragment';

export default gql`
  fragment TmdbPerson on tmdb_person {
    id
    adult
    also_known_as
    birthday
    deathday
    gender: tmdb_gender {
      ...TmdbGender
    }
    homepage
    imdb_id
    known_for_department
    name
    place_of_birth
    popularity
    profile_path
  }
  ${TMDB_GENDER_FRAGMENT}
`;
