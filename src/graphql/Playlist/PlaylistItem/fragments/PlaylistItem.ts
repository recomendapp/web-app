import { gql } from '@apollo/client';
import USER_FRAGMENT from '@/graphql/User/User/fragments/User';
import TMDB_MOVIE_MINIMAL_FRAGMENT from '@/graphql/Movie/fragments/tmdb_movie/minimal/tmdbMovieMinimalFragment';

export default gql`
  fragment PlaylistItem on playlist_item {
    id
    created_at
    playlist_id
    movie_id
    movie: tmdb_movie {
      ...TmdbMovieMinimal
    }
    user_id
    comment
    rank
    user {
      ...User
    }
  }
  ${USER_FRAGMENT}
  ${TMDB_MOVIE_MINIMAL_FRAGMENT}
`;
