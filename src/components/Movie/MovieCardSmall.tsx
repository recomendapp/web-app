'use client';

// UI
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

// DATE
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { ImageWithFallback } from '@/components/utils/ImageWithFallback';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { DateOnlyYearTooltip } from '@/components/utils/Date';
import MoviePoster from '@/components/Movie/MoviePoster';
import { TmdbMovieMinimalFragment } from '@/graphql/__generated__/graphql';
import { Movie, Person } from '@/types/type.db';

export default function MovieCardSmall({ movie }: { movie: Movie }) {
  return (
    <div className="flex gap-4 items-center">
      {/* MOVIE POSTER */}
      {/* <Link href={`/film/${movie.id}`}> */}
        <MoviePoster
          className="w-[60px]"
          src={'https://image.tmdb.org/t/p/original/' + movie?.poster_path}
          alt={movie?.title ?? ''}
          width={60}
          height={90}
        />
      {/* </Link> */}
      {/* MOVIE DATAT */}
      <div className="w-full block">
        {/* TITLE */}
        <Link href={`/film/${movie?.id}`} className=" font-medium line-clamp-2">
          {movie?.title}
        </Link>

        {/* DATE / GENRES / RUNTIME */}
        <div className="line-clamp-1">
          {movie?.directors.map((person: any, index: number) => (
            <>
              {index > 0 && <span className='text-muted-foreground'>, </span>}
              <span key={person?.id}>
                <Button
                  variant="link"
                  className="w-fit p-0 h-full italic text-muted-foreground hover:text-accent-1 transition"
                  asChild
                >
                  <Link href={`/person/${person?.id}`}>
                    {person?.name}
                  </Link>
                </Button>
              </span>
            </>
          )) ?? <span className="w-fit p-0 h-full font-bold">Unknown</span>}
        </div>

        {/* DATE */}
        <p className="lg:hidden">
          <DateOnlyYearTooltip date={movie?.release_date} />
        </p>
      </div>
    </div>
  );
}
