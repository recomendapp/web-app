'use client';

import { useState } from 'react';
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
import { Movie } from '@/types/type.db';

export default function MovieHeader({
  movie,
}: {
  movie: Movie;
}) {
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
            {movie.vote_count && (
              <div className='absolute flex flex-col gap-2 top-2 right-2 w-12'>
                <ActivityIcon
                  movieId={movie.id}
                  rating={movie.vote_average}
                  variant="general"
                  className="w-full"
                  tooltip='Note moyenne'
                />
                {movie.follower_avg_rating && <ActivityIcon
                  movieId={movie.id}
                  rating={movie.follower_avg_rating}
                  variant="follower"
                  className="w-full"
                  tooltip='Note followers'
                />}
              </div>
            )}
            {movie?.videos && movie.videos.length > 0 && (
              <MovieTrailerButton
                videos={movie.videos}
                className="absolute bottom-2 right-2"
              />
            )}
          </MoviePoster>
          {/* MOVIE MAIN DATA */}
          <div className="flex flex-col justify-between gap-2 w-full h-full py-4">
            {/* TYPE & GENRES */}
            <div>
              <span className='text-accent-1'>Film</span>
              <span className=" before:content-['_|_']">
                {movie.genres?.map((genre, index: number) => (
                  <span key={index}>
                    <Button
                      variant="link"
                      className="w-fit p-0 h-full font-normal"
                      asChild
                    >
                      <Link href={`/genre/${genre.id}`}>
                        {genre.name}
                      </Link>
                    </Button>
                    {index !== movie.genres?.length! - 1 && (
                      <span>, </span>
                    )}
                  </span>
                ))}
              </span>
            </div>
            {/* TITLE */}
            <div className="text-clamp space-x-1">
              <span className='font-bold select-text'>{movie.title}</span>
              {/* DATE */}
              <sup>
                <DateOnlyYearTooltip date={movie.release_date ?? ''} className=' text-base font-medium'/>
              </sup>
              {movie.original_title !== movie.title && (
                <div className='text-base font-semibold text-muted-foreground'>{movie.original_title}</div>
              )}
            </div>
            {/* <div> */}
              {/* <div className='flex items-center gap-2'>
                <Star size={20} className="text-accent-pink fill-accent-pink" />
                <span className='text-accent-pink font-medium'>{movie.vote_average?.toFixed(1)}</span>
              </div> */}
              
            {/* </div> */}
            <div className=" space-y-2">
              <div>
                {movie.directors?.map((director, index: number) => (
                  <>
                    {index > 0 && <span>, </span>}
                    <span key={index}>
                      <Button
                        variant="link"
                        className="w-fit p-0 h-full hover:text-accent-1 transition"
                        asChild
                      >
                        <Link href={`/person/${director?.id}`}>
                          {director?.name}
                        </Link>
                      </Button>
                    </span>
                  </>
                )) ?? <span className="w-fit p-0 h-full font-bold">Unknown</span>}
                {/* RUNTIME */}
                <RuntimeTooltip runtime={movie.runtime ?? 0} className=" before:content-['_•_']" />
              </div>
              {/* <div>
                {movie?.videos?.length > 0 && (
                  <MovieTrailerButton videos={movie.videos} />
                )} 
              </div> */}
            </div>
          </div>
        </div>
      </HeaderBox>
      <div className="px-4 pb-4">
        <MovieAction filmId={movie.id} all />
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
