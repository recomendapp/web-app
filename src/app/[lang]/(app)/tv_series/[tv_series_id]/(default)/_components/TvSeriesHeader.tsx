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
import { Play } from 'lucide-react';
import { DateOnlyYearTooltip } from '@/components/utils/Date';
import MoviePoster from '@/components/Movie/MoviePoster';
import { HeaderBox } from '@/components/Box/HeaderBox';
import { cn } from '@/lib/utils';
import { TooltipBox } from '@/components/Box/TooltipBox';
import { MediaTvSeries } from '@/types/type.db';
import { useModal } from '@/context/modal-context';
import { upperFirst } from 'lodash';
import { useLocale, useTranslations } from 'next-intl';
import MediaActionUserActivityLike from '@/components/Media/actions/MediaActionUserActivityLike';
import MediaActionUserActivityWatch from '@/components/Media/actions/MediaActionUserActivityWatch';
import MediaActionUserActivityWatchedDate from '@/components/Media/actions/MediaActionUserActivityWatchedDate';
import MediaActionUserActivityRating from '@/components/Media/actions/MediaActionUserActivityRating';
import MediaActionUserRecos from '@/components/Media/actions/MediaActionUserRecos';
import MediaActionUserWatchlist from '@/components/Media/actions/MediaActionUserWatchlist';
import { IconMediaRating } from '@/components/Media/icons/IconMediaRating';
import MediaActionPlaylistAdd from '@/components/Media/actions/MediaActionPlaylistAdd';
import { ModalMediaFollowersRating } from '@/components/Modals/ModalMediaFollowersRating';
import { ContextMenuMedia } from '@/components/ContextMenu/ContextMenuMedia';

export default function TvSerieHeader({
  serie,
  followersAvgRating,
}: {
  serie: MediaTvSeries;
  followersAvgRating?: number | null;
}) {
  const { openModal } = useModal();
  const common = useTranslations('common');
  if (!serie) return null;
  return (
    <div>
      <ContextMenuMedia media={serie}>
        <HeaderBox background={serie.backdrop_url ? { src: serie.backdrop_url, alt: serie.title ?? ''} : undefined}>
          <div className="flex flex-col w-full gap-4 items-center @xl/header-box:flex-row">
            {/* SERIE POSTER */}
            <MoviePoster
              className="w-[200px]"
              src={serie.avatar_url ?? ''}
              alt={serie.title ?? ''}
              fill
              sizes={`
                (max-width: 640px) 96px,
                (max-width: 1024px) 120px,
                150px
              `}
            >
                <div className='absolute flex flex-col gap-2 top-2 right-2 w-12'>
                  {(serie.vote_average || serie.tmdb_vote_average) ? <IconMediaRating
                    rating={serie.vote_average ?? serie.tmdb_vote_average}
                    variant="general"
                    className="w-full"
                  /> : null}
                  {followersAvgRating ? <IconMediaRating
                    rating={followersAvgRating}
                    variant="follower"
                    className="w-full cursor-pointer"
                    onClick={() => openModal(ModalMediaFollowersRating, { mediaId: serie.media_id! })}
                  /> : null}
                </div>
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
                <span className='text-accent-yellow'>{upperFirst(common('messages.tv_series', { count: 1 }))}</span>
                {serie.genres ? <Genres genres={serie.genres} className="before:content-['_|_']" /> : null}
              </div>
              {/* TITLE */}
              <h1 className="text-clamp space-x-1">
                <span className='font-bold select-text'>{serie.title}</span>
                {/* DATE */}
                <sup>
                  <DateOnlyYearTooltip date={serie.extra_data.first_air_date ?? ''} className=' text-base font-medium'/>
                </sup>
                {serie.extra_data.original_name !== serie.title && (
                  <div className='text-base font-semibold text-muted-foreground'>{serie.extra_data.original_name}</div>
                )}
              </h1>

              <div className=" space-y-2">
                <div>
                  {serie.main_credit?.map((director, index: number) => (
                    <Fragment key={index}>
                      {index > 0 && <span>, </span>}
                      <span key={index}>
                        <Button
                          variant="link"
                          className="w-fit p-0 h-full hover:text-accent-yellow transition"
                          asChild
                        >
                          <Link href={director.url ?? ''}>{director?.title}</Link>
                        </Button>
                      </span>
                    </Fragment>
                  )) ?? <span className="w-fit p-0 h-full font-bold">Unknown</span>}
                  {/* NUMBER OF SEASONS */}
                  <span className="before:content-['_•_']">
                    {common('messages.season_count', { count: serie.extra_data.number_of_seasons })}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </HeaderBox>
      </ContextMenuMedia>
      <div className="flex justify-between gap-2 px-4 pb-4">
        <div className="flex gap-2 overflow-x-auto items-center">
          <MediaActionUserActivityRating mediaId={serie.media_id!} />
          <MediaActionUserActivityLike mediaId={serie.media_id!} />
          <MediaActionUserActivityWatch mediaId={serie.media_id!} />
          <MediaActionUserWatchlist mediaId={serie.media_id!} />
          <MediaActionUserActivityWatchedDate mediaId={serie.media_id!} />
        </div>
        <div className="flex gap-2 items-center">
          <MediaActionPlaylistAdd mediaId={serie.media_id!} mediaTitle={serie.title} />
          <MediaActionUserRecos mediaId={serie.media_id!} mediaTitle={serie.title} />
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
          <DialogTitle className="absolute left-1/2 transform -translate-x-1/2 -top-12 @xl/movie-header:-top-16 text-accent-yellow-foreground text-2xl @xl/movie-header:text-5xl font-bold rounded-md bg-accent-yellow px-4 py-2 pointer-events-auto">
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