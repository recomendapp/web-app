import { gql } from '@apollo/client';
import USER_FRAGMENT from '@/graphql/User/User/fragments/User';
import USER_MOVIE_REVIEW_FRAGMENT from '@/graphql/User/Movie/Review/fragments/UserMovieReview';
import TMDB_MOVIE_FRAGMENT from '@/graphql/Movie/fragments/tmdb_movie/tmdbMovieFragment';

export default gql`
  fragment UserMovieActivity on user_movie_activity {
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
    movie: tmdb_movie {
      ...TmdbMovie
    }
    review: user_movie_review {
      ...UserMovieReview
    }
  }
  ${USER_FRAGMENT}
  ${USER_MOVIE_REVIEW_FRAGMENT}
  ${TMDB_MOVIE_FRAGMENT}
`;
