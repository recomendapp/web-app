import { MovieLikeAction } from '../MovieLikeAction/MovieLikeAction';
import { MovieWatchAction } from '../MovieWatchAction/MovieWatchAction';
import { MovieRateAction } from '../MovieRateAction/MovieRateAction';
import { MovieWatchDateAction } from '../MovieWatchDateAction/MovieWatchDateAction';
import { MovieWatchlistAction } from '../MovieWatchlistAction/MovieWatchlistAction';
import { MoviePlaylistAction } from '../MoviePlaylistAction/MoviePlaylistAction';
import { MovieSendAction } from '../MovieSendAction/MovieSendAction';

export function MovieAction({
  movieId,
  all,
  rating,
  like,
  watch,
  watchlist,
  playlist,
  send
}: {
  movieId: number;
  all?: boolean | undefined;
  rating?: boolean | undefined;
  like?: boolean | undefined;
  watch?: boolean | undefined;
  watchlist?: boolean | undefined;
  playlist?: boolean | undefined;
  send?: boolean | undefined
}) {

  return (
    <div className="flex justify-between gap-2">
      <div className='flex gap-2 overflow-x-auto'>
        {(all || rating) && <MovieRateAction movieId={movieId} />}
        {(all || like) && <MovieLikeAction movieId={movieId} />}
        {(all || watch) && <MovieWatchAction movieId={movieId} />}
        {(all || watchlist) && <MovieWatchlistAction movieId={movieId} />}
        {(all || watch) && <MovieWatchDateAction movieId={movieId} />}
        {/* )} */}
      </div>
      <div className='flex gap-2'>
        {(all || playlist) && <MoviePlaylistAction movieId={movieId} />}
        {(all || send) && <MovieSendAction movieId={movieId} />}
      </div>
    </div>
  );
}
