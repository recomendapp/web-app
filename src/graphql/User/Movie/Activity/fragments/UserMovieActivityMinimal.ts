import { gql } from '@apollo/client';
import USER_FRAGMENT from '@/graphql/User/User/fragments/User';
import TMDB_MOVIE_MINIMAL_FRAGMENT from '@/graphql/Movie/fragments/tmdb_movie/minimal/tmdbMovieMinimalFragment';

export default gql`
  fragment UserMovieActivityMinimal on user_movie_activity {
    id
    created_at
    updated_at
    user_id
    user {
      ...User
    }
    is_liked
    rating
    date
    movie_id
    review: user_movie_review {
      id
    }
  }
  ${USER_FRAGMENT}
  ${TMDB_MOVIE_MINIMAL_FRAGMENT}
`;
