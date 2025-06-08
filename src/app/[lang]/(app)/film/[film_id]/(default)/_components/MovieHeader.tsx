'use client';

import { Fragment, useState } from 'react';
import { Link } from "@/lib/i18n/routing";
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
import { RuntimeTooltip } from '@/components/utils/RuntimeTooltip';
import { cn } from '@/lib/utils';
import { TooltipBox } from '@/components/Box/TooltipBox';
import { MediaMovie } from '@/types/type.db';
import { useModal } from '@/context/modal-context';
import { useLocale, useTranslations } from 'next-intl';
import { upperFirst } from 'lodash';
import MediaActionUserActivityRating from '@/components/Media/actions/MediaActionUserActivityRating';
import MediaActionUserActivityLike from '@/components/Media/actions/MediaActionUserActivityLike';
import MediaActionUserActivityWatch from '@/components/Media/actions/MediaActionUserActivityWatch';
import MediaActionUserWatchlist from '@/components/Media/actions/MediaActionUserWatchlist';
import MediaActionUserActivityWatchedDate from '@/components/Media/actions/MediaActionUserActivityWatchedDate';
import MediaActionUserRecos from '@/components/Media/actions/MediaActionUserRecos';
import { IconMediaRating } from '@/components/Media/icons/IconMediaRating';
import MediaActionPlaylistAdd from '@/components/Media/actions/MediaActionPlaylistAdd';
import { ModalMediaFollowersRating } from '@/components/Modals/ModalMediaFollowersRating';
import { ContextMenuMedia } from '@/components/ContextMenu/ContextMenuMedia';

export default function MovieHeader({
  movie,
  followersAvgRating,
}: {
  movie: MediaMovie;
  followersAvgRating?: number | null;
}) {
  const { openModal } = useModal();
  const common = useTranslations('common');
  if (!movie) return null;
  return (
    <div>
      <ContextMenuMedia media={movie}>
        <HeaderBox background={movie.backdrop_url ? { src: movie.backdrop_url, alt: movie.title ?? ''} : undefined}>
          <div className="flex flex-col w-full gap-4 items-center @xl/header-box:flex-row">
            {/* MOVIE POSTER */}
            <MoviePoster
              className="w-[200px]"
              src={movie.avatar_url ?? ''}
              alt={movie.title ?? ''}
              fill
              sizes={`
                (max-width: 640px) 96px,
                (max-width: 1024px) 120px,
                150px
              `}
            >
              <div className='absolute flex flex-col gap-2 top-2 right-2 w-12'>
                {(movie.vote_average || movie.tmdb_vote_average) ? <IconMediaRating
                  rating={movie.vote_average ?? movie.tmdb_vote_average}
                  variant="general"
                  className="w-full"
                /> : null}
                {followersAvgRating ? <IconMediaRating
                  rating={followersAvgRating}
                  variant="follower"
                  className="w-full cursor-pointer"
                  onClick={() => openModal(ModalMediaFollowersRating, { mediaId: movie.media_id! })}
                /> : null}
              </div>
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
                <span className='text-accent-yellow'>{upperFirst(common('messages.film', { count: 1 }))}</span>
                {movie.genres ? <Genres genres={movie.genres} className="before:content-['_|_']" /> : null}
              </div>
              {/* TITLE */}
              <h1 className="text-clamp space-x-1">
                <span className='font-bold select-text'>{movie.title}</span>
                {/* DATE */}
                <sup>
                  <DateOnlyYearTooltip date={movie.extra_data.release_date ?? ''} className=' text-base font-medium'/>
                </sup>
                {movie.extra_data.original_title !== movie.title ? <div className='text-base font-semibold text-muted-foreground'>{movie.extra_data.original_title}</div> : null}
              </h1>
              <div className=" space-y-2">
                <div>
                  {movie.main_credit?.map((director, index: number) => (
                    <Fragment key={index}>
                      {index > 0 && <span>, </span>}
                      <span key={index}>
                        <Button
                          variant="link"
                          className="w-fit p-0 h-full hover:text-accent-yellow transition"
                          asChild
                        >
                          <Link href={`/person/${director?.slug ?? director?.id}`}>{director?.title}</Link>
                        </Button>
                      </span>
                    </Fragment>
                  )) ?? <span className="w-fit p-0 h-full font-bold">Unknown</span>}
                  {/* RUNTIME */}
                  <RuntimeTooltip runtime={movie.extra_data.runtime ?? 0} className=" before:content-['_•_']" />
                </div>
              </div>
            </div>
          </div>
        </HeaderBox>
      </ContextMenuMedia>
      <div className="flex justify-between gap-2 px-4 pb-4">
        <div className="flex gap-2 overflow-x-auto items-center">
          <MediaActionUserActivityRating mediaId={movie.media_id!} />
          <MediaActionUserActivityLike mediaId={movie.media_id!}  />
          <MediaActionUserActivityWatch mediaId={movie.media_id!} />
          <MediaActionUserWatchlist mediaId={movie.media_id!} />
          <MediaActionUserActivityWatchedDate mediaId={movie.media_id!} />
        </div>
        <div className="flex gap-2 items-center">
          <MediaActionPlaylistAdd mediaId={movie.media_id!} mediaTitle={movie.title} />
          <MediaActionUserRecos mediaId={movie.media_id!} mediaTitle={movie.title} />
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
      <DialogContent className="@xl/header-box:max-w-[60vw]">
        <DialogHeader className="relative flex flex-row gap-4 items-center">
          <DialogTitle className="absolute left-1/2 transform -translate-x-1/2 -top-12 @xl/header-box:-top-16 text-accent-yellow-foreground text-2xl @xl/header-box:text-5xl font-bold rounded-md bg-accent-yellow px-4 py-2 pointer-events-auto">
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