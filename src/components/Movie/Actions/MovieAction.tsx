'use client';

import { MovieLikeAction } from './components/MovieLikeAction/MovieLikeAction';
import { MovieWatchAction } from './components/MovieWatchAction/MovieWatchAction';
import { MovieRatingAction } from './components/MovieRatingAction/MovieRatingAction';
import { MovieWatchDateAction } from './components/MovieWatchAction/MovieWatchDateAction';
import { MovieWatchlistAction } from './components/MovieWatchlistAction/MovieWatchlistAction';
import { MoviePlaylistAction } from './components/MoviePlaylistAction/MoviePlaylistAction';
import { MovieSendAction } from './components/MovieSendAction/MovieSendAction';

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
  filmId: number;
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

  return (
    <div className="flex justify-between gap-2">
      <div className="flex gap-2 overflow-x-auto items-center">
        {(all || rating) && <MovieRatingAction movieId={filmId} />}
        {(all || like) && <MovieLikeAction movieId={filmId} />}
        {(all || watch) && <MovieWatchAction movieId={filmId} />}
        {(all || watchlist) && <MovieWatchlistAction movieId={filmId} />}
        {(all || watchDate) && <MovieWatchDateAction movieId={filmId} />}
      </div>
      <div className="flex gap-2 items-center">
        {(all || playlist) && <MoviePlaylistAction movieId={filmId} />}
        {(all || send) && <MovieSendAction movieId={filmId} />}
      </div>
    </div>
  );
}
