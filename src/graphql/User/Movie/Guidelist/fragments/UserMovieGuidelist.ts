import { gql } from '@apollo/client';
import USER_FRAGMENT from '@/graphql/User/User/fragments/User';
import TMDB_MOVIE_MINIMAL_FRAGMENT from '@/graphql/Movie/fragments/tmdb_movie/minimal/tmdbMovieMinimalFragment';

export default gql`
  fragment UserMovieGuidelist on user_movie_guidelist {
    id
    created_at
    movie_id
    movie: tmdb_movie {
      ...TmdbMovieMinimal
    }
    comment
    sender_user: user {
      ...User
    }
  }
  ${USER_FRAGMENT}
  ${TMDB_MOVIE_MINIMAL_FRAGMENT}
`;
