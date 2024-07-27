'use client';

// UI
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from '@/components/ui/context-menu';

// DATE
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { DateOnlyYearTooltip } from '@/components/utils/Date';
import MoviePoster from '@/components/Movie/MoviePoster';
import { MovieAction } from '@/components/Movie/Actions/MovieAction';
import { useLocale } from 'next-intl';
import ActivityIcon from '@/components/Review/ActivityIcon';
import { Movie, MoviePerson, UserMovieActivity } from '@/types/type.db';
import { useState } from 'react';

interface MovieCardProps {
  movie: Movie;
  displayMode?: 'grid' | 'row';
  link?: boolean;
  movieActivity?: UserMovieActivity;
  job?: string;
  width?: number;
  height?: number;
  fill?: boolean;
  sizes?: string;
}

export default function MovieCard({
  movie,
  displayMode,
  link = true,
  movieActivity,
  job,
  ...props
}: MovieCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  if (!movie) return null;

  if (displayMode == 'grid')
    return (
      <ContextMenu>
        <ContextMenuTrigger>
          <Tooltip delayDuration={500}>
            <TooltipTrigger asChild>
              <div
                className="group transition flex gap-4 items-center relative border-2 border-transparent hover:border-accent-1 rounded-md"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <Link href={`/film/${movie.id}`} className="w-full">
                  <MoviePoster
                    src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                    alt={movie.title ?? ''}
                    width={props.width}
                    height={props.height}
                    fill={props.fill}
                    sizes={props.sizes}
                  />
                </Link>
                {(movieActivity?.is_liked ||
                  movieActivity?.rating ||
                  movieActivity?.review) && (
                  <div className="absolute top-1 right-1 pointer-events-none">
                    <Link
                      href={`/@${movieActivity?.user?.username}/film/${movie.id}`}
                      className="pointer-events-auto"
                    >
                      <ActivityIcon
                        movieId={movieActivity.movie_id}
                        rating={movieActivity?.rating}
                        is_liked={movieActivity?.is_liked}
                        is_reviewed={movieActivity?.review?.id ?? null}
                      />
                    </Link>
                  </div>
                )}
                <div className="hidden absolute bottom-8 group-hover:lg:flex w-full justify-center pointer-events-none">
                  <div className="bg-background rounded-md w-fit pointer-events-auto">
                  {isHovered && (
                    <MovieAction filmId={movie.id!} watch watchlist dropdown />
                  )}
                  </div>
                </div>
              </div>
            </TooltipTrigger>
            <TooltipContent className="flex flex-col gap-2">
              <p className=" text-center line-clamp-1 whitespace-nowrap">
                {movie.title} ({movie.release_date && (new Date(movie.release_date)).getFullYear()})
              </p>
              {/* <MovieAction movie.id={movie.id} rating like watch playlist send /> */}
            </TooltipContent>
          </Tooltip>
        </ContextMenuTrigger>
        <ContextMenuContent className="w-64">
          <ContextMenuItem inset>
            Back
            <ContextMenuShortcut>⌘[</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem inset disabled>
            Forward
            <ContextMenuShortcut>⌘]</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem inset>
            Reload
            <ContextMenuShortcut>⌘R</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuSub>
            <ContextMenuSubTrigger inset>More Tools</ContextMenuSubTrigger>
            <ContextMenuSubContent className="w-48">
              <ContextMenuItem>
                Save Page As...
                <ContextMenuShortcut>⇧⌘S</ContextMenuShortcut>
              </ContextMenuItem>
              <ContextMenuItem>Create Shortcut...</ContextMenuItem>
              <ContextMenuItem>Name Window...</ContextMenuItem>
              <ContextMenuSeparator />
              <ContextMenuItem>Developer Tools</ContextMenuItem>
            </ContextMenuSubContent>
          </ContextMenuSub>
          <ContextMenuSeparator />
          <ContextMenuCheckboxItem checked>
            Show Bookmarks Bar
            <ContextMenuShortcut>⌘⇧B</ContextMenuShortcut>
          </ContextMenuCheckboxItem>
          <ContextMenuCheckboxItem>Show Full URLs</ContextMenuCheckboxItem>
          <ContextMenuSeparator />
          <ContextMenuRadioGroup value="pedro">
            <ContextMenuLabel inset>People</ContextMenuLabel>
            <ContextMenuSeparator />
            <ContextMenuRadioItem value="pedro">
              Pedro Duarte
            </ContextMenuRadioItem>
            <ContextMenuRadioItem value="colm">Colm Tuite</ContextMenuRadioItem>
          </ContextMenuRadioGroup>
        </ContextMenuContent>
      </ContextMenu>
    );

  return (
    <>
      {link ? (
        <Link
          href={`/film/${movie.id}`}
          className="relative flex gap-4 items-center"
        >
          <MovieCardRow movie={movie} job={job} {...props} />
        </Link>
      ) : (
        <div className="relative flex gap-4 items-center">
          <MovieCardRow movie={movie} job={job} {...props} />
        </div>
      )}
    </>
  );
}

interface MovieCardRowProps {
  movie: Movie,
  job?: string,
  width?: number;
  height?: number;
  fill?: boolean;
  sizes?: string;
}

export function MovieCardRow({
  movie,
  job,
  ...props
} : MovieCardRowProps) {
  return (
    <>
      <MoviePoster
        className=" w-14 lg:w-[100px]"
        src={`https://image.tmdb.org/t/p/original/${movie?.poster_path}`}
        alt={movie?.title ?? ''}
        width={props.width}
        height={props.height}
        fill={props.fill}
        sizes={props.sizes}
      />
      <div className="w-full block">
        {/* TITLE */}
        <h2 className="text-xl font-bold line-clamp-2">{movie?.title}</h2>

        <div className="line-clamp-1">
          {movie?.directors?.map((director: MoviePerson, index: number) => (
            <>
              {index > 0 && <span>, </span>}
              <span key={director?.id}>
                <Button
                  variant="link"
                  className="w-fit p-0 h-full hover:underline text-muted-foreground hover:text-accent-1 italic"
                  asChild
                >
                  <Link href={`/person/${director?.person?.id}`}>{director?.person?.name}</Link>
                </Button>
              </span>
            </>
          ))}
        </div>
        {/* DATE */}
        <DateOnlyYearTooltip date={movie?.release_date} />
        {job && <div className="text-muted-foreground">{job}</div>}
      </div>
    </>
  );
}
