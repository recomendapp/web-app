'use client';

import { Fragment, useState } from 'react';
import Link from 'next/link';
import { MovieActionCounter } from '@/components/Movie/MovieActionCounter';
import { MovieAction } from '@/components/Movie/Actions/MovieAction';
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
import ActivityIcon from '@/components/Review/ActivityIcon';
import { cn } from '@/lib/utils';
import { TooltipBox } from '@/components/Box/TooltipBox';
import { TvSerie } from '@/types/type.db';
import { useModal } from '@/context/modal-context';
import { ModalMovieFollowersRating } from '@/components/Modals/Movie/ModalMovieFollowersRating';
import { upperFirst } from 'lodash';
import { useLocale, useTranslations } from 'next-intl';

export default function TvSerieHeader({
  serie,
}: {
  serie: TvSerie;
}) {
  const { openModal } = useModal();
  const common = useTranslations('common');

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
            {serie.vote_count && (
              <div className='absolute flex flex-col gap-2 top-2 right-2 w-12'>
                <ActivityIcon
                  movieId={serie.id}
                  rating={serie.vote_average}
                  variant="general"
                  className="w-full"
                  tooltip='Note moyenne'
                />
                {/* {movie.follower_avg_rating && <ActivityIcon
                  movieId={movie.id}
                  rating={movie.follower_avg_rating}
                  variant="follower"
                  className="w-full"
                  tooltip='Note followers'
                  onClick={() => openModal(ModalMovieFollowersRating, { movieId: movie.id })}
                />} */}
              </div>
            )}
            {serie?.videos && serie.videos.length > 0 && (
              <SerieTrailerButton
                videos={serie.videos}
                className="absolute bottom-2 right-2"
              />
            )}
          </MoviePoster>
          {/* MOVIE MAIN DATA */}
          <div className="flex flex-col justify-between gap-2 w-full h-full py-4">
            {/* TYPE & GENRES */}
            <div>
              <span className='text-accent-1'>{upperFirst(common('messages.serie', { count: 1 }))}</span>
              <Genres genres={serie.genres} className="before:content-['_|_']" />
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
      <div className="px-4 pb-4">
        {/* <MovieAction filmId={serie.id} all /> */}
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