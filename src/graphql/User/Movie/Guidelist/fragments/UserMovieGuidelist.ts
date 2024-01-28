import { gql } from '@apollo/client';
import USER_MOVIE_GUIDELIST_ITEM_FRAGMENT from '@/graphql/User/Movie/Guidelist/fragments/UserMovieGuidelistItem';
import TMDB_MOVIE_MINIMAL_FRAGMENT from '@/graphql/Movie/fragments/tmdb_movie/minimal/tmdbMovieMinimalFragment';

export default gql`
  fragment UserMovieGuidelist on user_movie_guidelist {
    id
    created_at
    movie_id
    user_id
    movie: tmdb_movie {
      ...TmdbMovieMinimal
    }
    senders: user_movie_guidelist_itemCollection(
      orderBy: [
        { created_at: AscNullsLast }
      ]
    ) {
      edges {
        node {
          ...UserMovieGuidelistItem
        }
      }
      totalCount
    }
  }
  ${USER_MOVIE_GUIDELIST_ITEM_FRAGMENT}
  ${TMDB_MOVIE_MINIMAL_FRAGMENT}
`;
