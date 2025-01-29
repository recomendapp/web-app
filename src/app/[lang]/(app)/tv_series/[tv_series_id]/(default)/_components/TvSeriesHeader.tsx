'use client';

import { Fragment, useState } from 'react';
import Link from 'next/link';
import YoutubeEmbed from '@/components/utils/Youtube';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
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
import { cn } from '@/lib/utils';
import { TooltipBox } from '@/components/Box/TooltipBox';
import { MediaTvSeries, TvSerie } from '@/types/type.db';
import { useModal } from '@/context/modal-context';
import { upperFirst } from 'lodash';
import { useLocale, useTranslations } from 'next-intl';
import UserActivityLike from '@/components/Media/actions/UserActivityLike';
import UserActivityWatch from '@/components/Media/actions/UserActivityWatch';
import UserActivityWatchedDate from '@/components/Media/actions/UserActivityWatchedDate';
import UserActivityRating from '@/components/Media/actions/UserActivityRating';
import UserRecos from '@/components/Media/actions/UserRecos';
import UserWatchlist from '@/components/Media/actions/UserWatchlist';
import { IconMediaRating } from '@/components/Media/icons/IconMediaRating';
import MediaActionPlaylistAdd from '@/components/Media/actions/MediaActionPlaylistAdd';

export default function TvSerieHeader({
  serie,
}: {
  serie: MediaTvSeries;
}) {
  const { openModal } = useModal();
  const common = useTranslations('common');
  console.log('test', serie.vote_average ?? serie.tmdb_vote_average);
  if (!serie) return null;
  return (
    <div>
      <HeaderBox
        className='@container/serie-header'
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/w1280/${serie.backdrop_path})`,
        }}
      >
        <div className="flex flex-col w-full gap-4 items-center @xl/serie-header:flex-row">
          {/* SERIE POSTER */}
          <MoviePoster
            className="w-[200px]"
            src={`https://image.tmdb.org/t/p/original/${serie.poster_path}`}
            alt={serie.name ?? ''}
            fill
            sizes={`
              (max-width: 640px) 96px,
              (max-width: 1024px) 120px,
              150px
            `}
          >
            {serie.vote_count ? (
              <div className='absolute flex flex-col gap-2 top-2 right-2 w-12'>
                {(serie.vote_average || serie.tmdb_vote_average) ? <IconMediaRating
                  rating={serie.vote_average ?? serie.tmdb_vote_average}
                  variant="general"
                  className="w-full"
                  tooltip='Note moyenne'
                /> : null}
                {/* {movie.follower_avg_rating && <ActivityIcon
                  movieId={movie.id}
                  rating={movie.follower_avg_rating}
                  variant="follower"
                  className="w-full"
                  tooltip='Note followers'
                  onClick={() => openModal(ModalMovieFollowersRating, { movieId: movie.id })}
                />} */}
              </div>
            ) : null}
            {(serie?.videos && serie.videos.length > 0) ? (
              <SerieTrailerButton
                videos={serie.videos}
                className="absolute bottom-2 right-2"
              />
            ) : null}
          </MoviePoster>
          {/* MOVIE MAIN DATA */}
          <div className="flex flex-col justify-between gap-2 w-full h-full py-4">
            {/* TYPE & GENRES */}
            <div>
              <span className='text-accent-1'>{upperFirst(common('messages.serie', { count: 1 }))}</span>
              {serie.genres ? <Genres genres={serie.genres} className="before:content-['_|_']" /> : null}
            </div>
            {/* TITLE */}
            <div className="text-clamp space-x-1">
              <span className='font-bold select-text'>{serie.name}</span>
              {/* DATE */}
              <sup>
                <DateOnlyYearTooltip date={serie.first_air_date ?? ''} className=' text-base font-medium'/>
              </sup>
              {serie.original_name !== serie.name && (
                <div className='text-base font-semibold text-muted-foreground'>{serie.original_name}</div>
              )}
            </div>

            <div className=" space-y-2">
              <div>
                {serie.created_by?.map((director, index: number) => (
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
                {/* NUMBER OF SEASONS */}
                <span className="before:content-['_•_']">
                  {common('messages.season_count', { count: serie.number_of_seasons })}
                </span>
              </div>
            </div>
          </div>
        </div>
      </HeaderBox>
      <div className="flex justify-between gap-2 px-4 pb-4">
        <div className="flex gap-2 overflow-x-auto items-center">
          <UserActivityRating mediaId={serie.id} mediaType={'tv_series'} />
          <UserActivityLike mediaId={serie.id} mediaType={'tv_series'} />
          <UserActivityWatch mediaId={serie.id} mediaType={'tv_series'} />
          <UserWatchlist mediaId={serie.id} mediaType={'tv_series'} />
          <UserActivityWatchedDate mediaId={serie.id} mediaType={'tv_series'} />
        </div>
        <div className="flex gap-2 items-center">
          <MediaActionPlaylistAdd mediaId={serie.id} mediaType={'tv_series'} mediaTitle={serie.name} />
          <UserRecos mediaId={serie.id} mediaType={'tv_series'} mediaTitle={serie.name} />
        </div>
      </div>
    </div>
  );
}

export function SerieTrailerButton({
  videos,
  className,
} : {
  videos: Database['public']['Tables']['tmdb_tv_series_videos']['Row'][];
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
          <DialogTitle className="absolute left-1/2 transform -translate-x-1/2 -top-12 @xl/movie-header:-top-16 text-accent-1-foreground text-2xl @xl/movie-header:text-5xl font-bold rounded-md bg-accent-1 px-4 py-2 pointer-events-auto">
            TRAILER
          </DialogTitle>
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