import { MovieLikeAction } from './_components/MovieLikeAction/MovieLikeAction';
import { MovieWatchAction } from './_components/MovieWatchAction/MovieWatchAction';
import { MovieRatingAction } from './_components/MovieRatingAction/MovieRatingAction';
import { MovieWatchDateAction } from './_components/MovieWatchDateAction/MovieWatchDateAction';
import { MovieWatchlistAction } from './_components/MovieWatchlistAction/MovieWatchlistAction';
import { MoviePlaylistAction } from './_components/MoviePlaylistAction/MoviePlaylistAction';
import { MovieSendAction } from './_components/MovieSendAction/MovieSendAction';
import { useUser } from '@/context/UserProvider';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { Button } from '@/components/ui/button';
import { MovieActionDropdownMenu } from './_components/MovieActionDropdownMenu/MovieActionDropdownMenu';
import { useQuery } from '@apollo/client';
import FILM_ACTION_QUERY from './queries/filmActionQuery';
import { useAuth } from '@/context/AuthContext/AuthProvider';

export function MovieAction({
  filmId,
  all,
  rating,
  like,
  watch,
  watchDate,
  watchlist,
  playlist,
  send,
  dropdown,
}: {
  filmId: string;
  all?: boolean;
  rating?: boolean;
  like?: boolean;
  watch?: boolean;
  watchDate?: boolean;
  watchlist?: boolean;
  playlist?: boolean;
  send?: boolean;
  dropdown?: boolean;
}) {

  const { user } = useAuth();

  const { data: filmActionQuery, loading, error } = useQuery(FILM_ACTION_QUERY, {
    variables: {
      film_id: filmId,
      user_id: user?.id,
    },
    skip: !user
  })

  console.log('filmActionQuery', filmActionQuery)

  // isRated
  // const { data: isRated } = useQuery({
  //   queryKey: ['movie', movieId, 'rating'],
  //   queryFn: () => handleGetRating(user.$id, movieId),
  //   enabled: user?.$id !== undefined && user?.$id !== null,
  // });
  // // isLiked
  // const { data: isLiked } = useQuery({
  //   queryKey: ['movie', movieId, 'like'],
  //   queryFn: () => handleGetLike(user.$id, movieId),
  //   enabled: user?.$id !== undefined && user?.$id !== null,
  // });
  // // isWatched
  // const { data: isWatched } = useQuery({
  //   queryKey: ['movie', movieId, 'watch'],
  //   queryFn: () => handleGetWatch(user.$id, movieId),
  //   enabled: user?.$id !== undefined && user?.$id !== null,
  // });
  // // isWatchlisted
  // const { data: isWatchlisted } = useQuery({
  //   queryKey: ['movie', movieId, 'watchlist'],
  //   queryFn: () => handleGetWatchlist(user.$id, movieId),
  //   enabled: user?.$id !== undefined && user?.$id !== null,
  // });  

  return (
    <div className="flex justify-between gap-2">
      <div className='flex gap-2 overflow-x-auto'>
        {(all || rating) && 
          <MovieRatingAction
            filmId={filmId}
            filmAction={filmActionQuery?.film_actionCollection?.edges[0]?.action}
            loading={loading}
            error={error} 
          />
        }
        {(all || like) &&
          <MovieLikeAction
            filmId={filmId}
            filmAction={filmActionQuery?.film_actionCollection?.edges[0]?.action}
            loading={loading}
            error={error} 
          />
        }
        {(all || watch) &&
          <MovieWatchAction
            filmId={filmId}
            filmAction={filmActionQuery?.film_actionCollection?.edges[0]?.action}
            loading={loading}
            error={error}
          />
        }
        {(all || watchlist) && 
          <MovieWatchlistAction
            filmId={filmId}
            filmAction={filmActionQuery?.film_actionCollection?.edges[0]?.action}
            loading={loading}
            error={error}
          />
        }
        {/* {(all || watchDate) && <MovieWatchDateAction movieId={movieId} />} */}
      </div>
      {/* <div className='flex gap-2'>
        {(all || playlist) && <MoviePlaylistAction movieId={movieId} />}
        {(all || send) && <MovieSendAction movieId={movieId} />}
        {dropdown && <MovieActionDropdownMenu movieId={movieId} />}
      </div> */}
    </div>
  );
}