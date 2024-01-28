'use client';

// UI
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

// DATE
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { ImageWithFallback } from '@/components/utils/ImageWithFallback';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { DateOnlyYearTooltip } from '@/components/utils/Date';
import MoviePoster from '@/components/Movie/MoviePoster';
import { TmdbMovieMinimalFragment } from '@/graphql/__generated__/graphql';

export default function MovieCardSmall({ movie }: { movie: TmdbMovieMinimalFragment }) {
  return (
    <Link href={`/film/${movie.id}`} className="flex gap-4 items-center">
      {/* MOVIE POSTER */}
      <MoviePoster
        className="w-[70px]"
        poster_path={'https://image.tmdb.org/t/p/original/' + movie.data?.edges[0].node.poster_path}
        alt={movie.data?.edges[0].node.title ?? ''}
      />
      {/* MOVIE DATAT */}
      <div className="w-full block">
        {/* TITLE */}
        <h2 className="text-lg font-bold line-clamp-2">{movie.data?.edges[0].node.title}</h2>

        {/* DATE / GENRES / RUNTIME */}
        <div className="line-clamp-1">
          {movie.directors?.edges.map(({ node }, index: number) => (
            <>
              {index > 0 && <span className='text-muted-foreground'>, </span>}
              <span key={node.id}>
                <Button
                  variant="link"
                  className="w-fit p-0 h-full italic text-muted-foreground hover:text-accent-1 transition"
                  asChild
                >
                  <Link href={`/person/${node.person.id}`}>
                    {node.person.name}
                  </Link>
                </Button>
              </span>
            </>
          )) ?? <span className="w-fit p-0 h-full font-bold">Unknown</span>}
        </div>

        {/* DATE */}
        <p className="lg:hidden">
          <DateOnlyYearTooltip date={movie.release_date} />
        </p>
      </div>
    </Link>
  );
}
