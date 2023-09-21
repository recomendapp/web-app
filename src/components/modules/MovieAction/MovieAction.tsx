import { MovieLikeAction } from './_components/MovieLikeAction/MovieLikeAction';
import { MovieWatchAction } from './_components/MovieWatchAction/MovieWatchAction';
import { MovieRatingAction } from './_components/MovieRatingAction/MovieRatingAction';
import { MovieWatchDateAction } from './_components/MovieWatchDateAction/MovieWatchDateAction';
import { MovieWatchlistAction } from './_components/MovieWatchlistAction/MovieWatchlistAction';
import { MoviePlaylistAction } from './_components/MoviePlaylistAction/MoviePlaylistAction';
import { MovieSendAction } from './_components/MovieSendAction/MovieSendAction';
import { useQuery } from 'react-query';
import { handleGetRating } from './_components/MovieRatingAction/queries/movie-action-rating';
import { useUser } from '@/context/UserProvider';
import { handleGetLike } from './_components/MovieLikeAction/_queries/movie-action-like';
import { handleGetWatch } from './_components/MovieWatchAction/_queries/movie-action-watch';
import { handleGetWatchlist } from './_components/MovieWatchlistAction/_queries/movie-action-watchlist';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { Button } from '@/components/ui/button';
import { MovieActionDropdownMenu } from './_components/MovieActionDropdownMenu/MovieActionDropdownMenu';

export function MovieAction({
  movieId,
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
  movieId: number;
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

  const { user } = useUser();

  // isRated
  const { data: isRated } = useQuery({
    queryKey: ['movie', movieId, 'rating'],
    queryFn: () => handleGetRating(user.$id, movieId),
    enabled: user?.$id !== undefined && user?.$id !== null,
  });
  // isLiked
  const { data: isLiked } = useQuery({
    queryKey: ['movie', movieId, 'like'],
    queryFn: () => handleGetLike(user.$id, movieId),
    enabled: user?.$id !== undefined && user?.$id !== null,
  });
  // isWatched
  const { data: isWatched } = useQuery({
    queryKey: ['movie', movieId, 'watch'],
    queryFn: () => handleGetWatch(user.$id, movieId),
    enabled: user?.$id !== undefined && user?.$id !== null,
  });
  // isWatchlisted
  const { data: isWatchlisted } = useQuery({
    queryKey: ['movie', movieId, 'watchlist'],
    queryFn: () => handleGetWatchlist(user.$id, movieId),
    enabled: user?.$id !== undefined && user?.$id !== null,
  });  

  return (
    <div className="flex justify-between gap-2">
      <div className='flex gap-2 overflow-x-auto'>
        {(all || rating) && <MovieRatingAction movieId={movieId} />}
        {(all || like) && <MovieLikeAction movieId={movieId} />}
        {(all || watch) && <MovieWatchAction movieId={movieId} />}
        {(all || watchlist) && <MovieWatchlistAction movieId={movieId} />}
        {(all || watchDate) && <MovieWatchDateAction movieId={movieId} />}
      </div>
      <div className='flex gap-2'>
        {(all || playlist) && <MoviePlaylistAction movieId={movieId} />}
        {(all || send) && <MovieSendAction movieId={movieId} />}
        {dropdown && <MovieActionDropdownMenu movieId={movieId} />}
      </div>
    </div>
  );
}