'use client';

import { Fragment, useState } from 'react';
import Link from 'next/link';
import YoutubeEmbed from '@/components/utils/Youtube';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// ICONS
import { Play } from 'lucide-react';
import { DateOnlyYearTooltip } from '@/components/utils/Date';
import MoviePoster from '@/components/Movie/MoviePoster';
import { HeaderBox } from '@/components/Box/HeaderBox';
import { RuntimeTooltip } from '@/components/utils/RuntimeTooltip';
import { cn } from '@/lib/utils';
import { TooltipBox } from '@/components/Box/TooltipBox';
import { MediaMovie } from '@/types/type.db';
import { useModal } from '@/context/modal-context';
import { ModalMovieFollowersRating } from '@/components/Modals/Movie/ModalMovieFollowersRating';
import { useLocale, useTranslations } from 'next-intl';
import { upperFirst } from 'lodash';
import UserActivityRating from '@/components/media/actions/UserActivityRating';
import UserActivityLike from '@/components/media/actions/UserActivityLike';
import UserActivityWatch from '@/components/media/actions/UserActivityWatch';
import UserWatchlist from '@/components/media/actions/UserWatchlist';
import UserActivityWatchedDate from '@/components/media/actions/UserActivityWatchedDate';
import UserRecos from '@/components/media/actions/UserRecos';
import { IconMediaRating } from '@/components/media/icons/IconMediaRating';

export default function MovieHeader({
  movie,
}: {
  movie: MediaMovie;
}) {
  const { openModal } = useModal();
  const common = useTranslations('common');

  if (!movie) return null;
  return (
    <div>
      <HeaderBox
        className='@container/movie-header'
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/w1280/${movie.backdrop_path})`,
        }}
      >
        <div className="flex flex-col w-full gap-4 items-center @xl/movie-header:flex-row">
          {/* MOVIE POSTER */}
          <MoviePoster
            className="w-[200px]"
            src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
            alt={movie.title ?? ''}
            fill
            sizes={`
              (max-width: 640px) 96px,
              (max-width: 1024px) 120px,
              150px
            `}
          >
            {movie.vote_count ? (
              <div className='absolute flex flex-col gap-2 top-2 right-2 w-12'>
                {movie.vote_average ? <IconMediaRating
                  rating={movie.vote_average}
                  variant="general"
                  className="w-full"
                  tooltip='Note moyenne'
                /> : null}
                {movie.follower_avg_rating ? <IconMediaRating
                  rating={movie.follower_avg_rating}
                  variant="follower"
                  className="w-full"
                  tooltip='Note followers'
                  onClick={() => openModal(ModalMovieFollowersRating, { movieId: movie.id })}
                /> : null}
              </div>
            ) : null}
            {(movie?.videos && movie.videos.length > 0) ? (
              <MovieTrailerButton
                videos={movie.videos}
                className="absolute bottom-2 right-2"
              />
            ) : null}
          </MoviePoster>
          {/* MOVIE MAIN DATA */}
          <div className="flex flex-col justify-between gap-2 w-full h-full py-4">
            {/* TYPE & GENRES */}
            <div>
              <span className='text-accent-1'>{upperFirst(common('word.film', { count: 1 }))}</span>
              {movie.genres ? <Genres genres={movie.genres} className="before:content-['_|_']" /> : null}
            </div>
            {/* TITLE */}
            <div className="text-clamp space-x-1">
              <span className='font-bold select-text'>{movie.title}</span>
              {/* DATE */}
              <sup>
                <DateOnlyYearTooltip date={movie.release_date ?? ''} className=' text-base font-medium'/>
              </sup>
              {movie.original_title !== movie.title ? <div className='text-base font-semibold text-muted-foreground'>{movie.original_title}</div> : null}
            </div>
            <div className=" space-y-2">
              <div>
                {movie.directors?.map((director, index: number) => (
                  <Fragment key={index}>
                    {index > 0 && <span>, </span>}
                    <span key={index}>
                      <Button
                        variant="link"
                        className="w-fit p-0 h-full hover:text-accent-1 transition"
                        asChild
                      >
                        <Link href={`/person/${director?.slug ?? director?.id}`}>{director?.name}</Link>
                      </Button>
                    </span>
                  </Fragment>
                )) ?? <span className="w-fit p-0 h-full font-bold">Unknown</span>}
                {/* RUNTIME */}
                <RuntimeTooltip runtime={movie.runtime ?? 0} className=" before:content-['_•_']" />
              </div>
            </div>
          </div>
        </div>
      </HeaderBox>
      <div className="flex justify-between gap-2 px-4 pb-4">
        <div className="flex gap-2 overflow-x-auto items-center">
          <UserActivityRating mediaId={movie.id} mediaType={'movie'} />
          <UserActivityLike mediaId={movie.id} mediaType={'movie'} />
          <UserActivityWatch mediaId={movie.id} mediaType={'movie'} />
          <UserWatchlist mediaId={movie.id} mediaType={'movie'} />
          <UserActivityWatchedDate mediaId={movie.id} mediaType={'movie'} />
        </div>
        <div className="flex gap-2 items-center">
          {/* <MoviePlaylistAction movieId={filmId} /> */}
          <UserRecos mediaId={movie.id} mediaType={'movie'} mediaTitle={movie.title} />
        </div>
      </div>
    </div>
  );
}

export function MovieTrailerButton({
  videos,
  className,
} : {
  videos: Database['public']['Tables']['tmdb_movie_videos']['Row'][];
  className?: string;
}) {
  const [selectedTrailer, setSelectedTailer] = useState<string>(
    videos[0].key ?? ''
  );

  if (!videos?.length) return null;

  return (
    <Dialog>
      <TooltipBox tooltip={videos.length > 1 ? 'Voir les trailers' : 'Voir le trailer'}>
        <DialogTrigger asChild>
          <Button variant={'default'} className={cn("p-1.5 w-6 h-6 shrink-0 bg-foreground rounded-full", className)}>
            <Play
              size="icon"
              className="text-background fill-background"
            />
          </Button>
        </DialogTrigger>
      </TooltipBox>
      <DialogContent className="@xl/movie-header:max-w-[60vw]">
        <DialogHeader className="relative flex flex-row gap-4 items-center">
          <div className="absolute w-full flex justify-center -top-12 @xl/movie-header:-top-16 pointer-events-none">
            <h2 className="text-accent-1-foreground text-2xl @xl/movie-header:text-5xl font-bold rounded-md bg-accent-1 px-4 py-2 pointer-events-auto">
              TRAILER
            </h2>
          </div>
          <div className=" pt-4">
            <Select
              onValueChange={setSelectedTailer}
              defaultValue={selectedTrailer}
            >
              <SelectTrigger className="w-fit">
                <SelectValue placeholder="Langue" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {videos?.map((video: any) => (
                    <SelectItem key={video.key} value={video.key}>
                      {video.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </DialogHeader>
        <YoutubeEmbed embedId={selectedTrailer} className="aspect-video" />
      </DialogContent>
    </Dialog>
  );
}

const Genres = ({
  genres,
  className,
} : {
  genres: {
    id: number;
    name: string;
  }[];
  className?: string;
}) => {
  const locale = useLocale();
  const formattedGenres = new Intl.ListFormat(locale, {
    style: 'narrow',
    type: 'conjunction',
  }).formatToParts(genres.map((genre) => genre.name));

  return (
    <span className={cn("", className)}>
      {formattedGenres.map((part, index) => {
        if (part.type === 'element') {
          const genre = genres.find((g) => g.name === part.value);
          return (
            <Button
              key={index}
              variant="link"
              className="w-fit p-0 h-full font-normal"
              asChild
            >
              <Link href={`/genre/${genre?.id}`}>{part.value}</Link>
            </Button>
          );
        }
        return part.value;
      })}
    </span>
  );
}