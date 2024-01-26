'use client';

import { useState } from 'react';
import Link from 'next/link';
import { MovieActionCounter } from '@/components/Movie/MovieActionCounter';
import { MovieAction } from '@/components/Movie/Actions/MovieAction';
import YoutubeEmbed from '@/components/utils/Youtube';

// UI
import { ImageWithFallback } from '@/components/utils/ImageWithFallback';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
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

// DATE
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { ConvertHoursMinutes } from '@/lib/utils';

// ICONS
import { Play } from 'lucide-react';
import { DateOnlyYearTooltip } from '@/components/utils/Date';
import MoviePoster from '@/components/Movie/MoviePoster';
import { useAuth } from '@/context/auth-context';
import { HeaderBox } from '@/components/Box/HeaderBox';
import { TmdbMovieFragment } from '@/graphql/__generated__/graphql';
import { RuntimeTooltip } from '@/components/utils/RuntimeTooltip';

export default function MovieHeader({
  movie,
  small,
}: {
  movie: TmdbMovieFragment;
  small?: boolean;
}) {
  if (!movie) return null;

  if (small) {
    return <MovieHeaderSmall movie={movie} />;
  }

  return (
    <div>
      <HeaderBox
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/w1280/${movie.backdrop_path})`,
        }}
      >
        <div className="flex flex-col w-full gap-4 items-center @xl:flex-row">
          {/* MOVIE POSTER */}
          <MoviePoster
            className="w-[200px]"
            poster_path={`https://image.tmdb.org/t/p/w500/${movie.data?.edges[0].node.poster_path}`}
            alt={movie.data?.edges[0].node.title ?? ''}
          />
          {/* MOVIE MAIN DATA */}
          <div className="flex flex-col justify-between gap-2 w-full h-full py-4">
            {/* TYPE & GENRES */}
            <div>
              <span className='text-accent-1'>Film</span>
              <span className=" before:content-['_|_']">
                {movie.genres?.edges.map(({ node }, index: number) => (
                  <span key={node.genre_id}>
                    <Button
                      variant="link"
                      className="w-fit p-0 h-full font-normal"
                      asChild
                    >
                      <Link href={`/genre/${node.genre_id}`}>
                        {node.genre.data?.edges[0].node.name}
                      </Link>
                    </Button>
                    {index !== movie.genres?.edges.length! - 1 && (
                      <span>, </span>
                    )}
                  </span>
                ))}
              </span>
            </div>
            {/* TITLE */}
            <div>
              <div className="text-xl lg:text-6xl font-bold line-clamp-2">
                <span>{movie.data?.edges[0].node.title}</span>
              </div>
              {/* DATE */}
              <DateOnlyYearTooltip date={movie.release_date ?? ''} className='text-2xl'/>
              
            </div>
            <div className=" space-y-2">
              {/* DATE / GENRES / RUNTIME */}
              <div>
                {movie.directors?.edges.map(({ node }, index: number) => (
                  <>
                    {index > 0 && <span>, </span>}
                    <span key={node.id}>
                      <Button
                        variant="link"
                        className="w-fit p-0 h-full hover:text-accent-1 transition"
                        asChild
                      >
                        <Link href={`/person/${node.person.id}`}>
                          {node.person.name}
                        </Link>
                      </Button>
                    </span>
                  </>
                )) ?? <span className="w-fit p-0 h-full font-bold">Unknown</span>}
                {/* RUNTIME */}
                <RuntimeTooltip runtime={movie.runtime ?? 0} className=" before:content-['_•_']" />
              </div>
              <div>
                {/* <MovieActionCounter movieId={movie.id} /> */}
                {movie?.videos?.edges.length! > 0 && (
                  <MovieTrailerButton movie={movie} />
                )} 
              </div>
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

export function MovieTrailerButton({ movie }: { movie: TmdbMovieFragment }) {
  const [selectedTrailer, setSelectedTailer] = useState<string>(
    movie.videos?.edges[0].node.key ?? ''
  );

  if (!movie.videos?.edges.length) return null;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={'ghost'} className="w-fit flex gap-2 p-2">
          <Play
            fill="black"
            size="icon"
            className="bg-white rounded-full p-1 w-6"
          />
          Trailer
        </Button>
      </DialogTrigger>
      <DialogContent className="lg:max-w-[60vw]">
        <DialogHeader className="relative flex flex-row gap-4 items-center">
          <div className="absolute w-full flex justify-center -top-16">
            <h2 className="text-accent-1-foreground text-5xl font-bold rounded-md bg-accent-1 px-4 py-2">
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
                  {movie.videos?.edges.map(({ node }: any) => (
                    <SelectItem key={node.key} value={node.key}>
                      {node.name}
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

export function MovieHeaderSmall({ movie }: { movie: any }) {
  return (
    <div
      className="bg-white"
      style={{
        backgroundImage: `url('https://image.tmdb.org/t/p/original/${movie.backdrop_path}')`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        height: 'clamp(150px,30vh,200px)',
      }}
    >
      <div className="w-full h-full flex  p-4 items-center bg-gradient-to-t from-background to-[#000000bd] bg-opacity-75">
        <div className="flex gap-4 items-center">
          {/* MOVIE POSTER */}
          <div className="w-[100px] shadow-md">
            <AspectRatio ratio={2 / 3}>
              <ImageWithFallback
                src={'https://image.tmdb.org/t/p/original/' + movie.poster_path}
                alt={movie.title}
                fill
                className="rounded-md object-cover"
              />
            </AspectRatio>
          </div>
          {/* MOVIE MAIN DATA */}
          <div className="flex flex-col gap-2">
            {/* TYPE */}
            <div>Film</div>
            {/* TITLE */}
            <div className="text-xl lg:text-4xl font-bold">
              <span>{movie.title}</span>
            </div>
            {/* DATE / GENRES / RUNTIME */}
            <div>
              {movie.credits.crew.filter(
                (member: any) => member.job === 'Director'
              ).length ? (
                movie.credits.crew
                  .filter((member: any) => member.job === 'Director')
                  .map((director: any, index: number) => (
                    <span key={director.id}>
                      <Button
                        variant="link"
                        className="w-fit p-0 h-full font-bold "
                        asChild
                      >
                        <Link href={`/person/${director.id}`}>
                          {director.name}
                        </Link>
                      </Button>
                      {index !==
                        movie.credits.crew.filter(
                          (member: any) => member.job === 'Director'
                        ).length -
                          1 && <span> • </span>}
                    </span>
                  ))
              ) : (
                <span className="w-fit p-0 h-full font-bold">Unknown</span>
              )}

              {/* DATE */}
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className=" before:content-['_•_']">
                      {movie.release_date.split('-')[0]}
                    </span>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">
                    {movie.release_date
                      ? format(new Date(movie.release_date), 'PPP', {
                          locale: fr,
                        })
                      : 'Unknown'}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
