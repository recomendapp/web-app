'use client';

// UI
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
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
import { getYear } from 'date-fns';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { DateOnlyYearTooltip } from '@/components/utils/Date';
import MoviePoster from '@/components/Movie/MoviePoster';
import { MovieAction } from '@/components/Movie/Actions/MovieAction';
import { useLocale } from 'next-intl';
import ActivityIcon from '@/components/Review/ActivityIcon';
import { Movie, MoviePerson, UserMovieActivity } from '@/types/type.db';

interface MovieCardProps {
  movie: Movie;
  displayMode?: 'grid' | 'row';
  link?: boolean;
  movieActivity?: UserMovieActivity | null;
}

export default function MovieCard({
  movie,
  displayMode,
  link = true,
  movieActivity,
}: MovieCardProps) {
  const locale = useLocale();

  if (!movie) return null;

  if (displayMode == 'grid')
    return (
      <ContextMenu>
        <ContextMenuTrigger>
          <TooltipProvider delayDuration={0}>
            <Tooltip delayDuration={500}>
              <TooltipTrigger asChild>
                <div className="group transition flex gap-4 items-center relative border-2 border-transparent hover:border-accent-1 rounded-md">
                  <Link href={`/film/${movie.id}`} className="w-full">
                    <MoviePoster
                      poster_path={`https://image.tmdb.org/t/p/w500/${movie.data[0].poster_path}`}
                      alt={movie.data[0].title ?? ''}
                    />
                  </Link>
                  {(movieActivity?.is_liked ||
                    movieActivity?.rating ||
                    movieActivity?.review) && (
                    <div className="absolute -bottom-2 mx-auto my-auto w-full flex justify-center pointer-events-none">
                      <Link
                        href={`/@${movieActivity?.user?.username}/film/${movie.id}`}
                        className="pointer-events-auto"
                      >
                        <ActivityIcon
                          rating={movieActivity?.rating}
                          is_liked={movieActivity?.is_liked}
                          is_reviewed={movieActivity?.review ? true : false}
                        />
                      </Link>
                    </div>
                  )}
                  <div className="hidden absolute bottom-8 group-hover:lg:flex w-full justify-center pointer-events-none">
                    <div className="bg-background rounded-md w-fit pointer-events-auto">
                      <MovieAction filmId={movie.id} watch watchlist dropdown />
                    </div>
                  </div>
                </div>
              </TooltipTrigger>
              <TooltipContent className="flex flex-col gap-2">
                <p className=" text-center line-clamp-1 whitespace-nowrap">
                  {movie.data[0].title} ({movie.release_date && getYear(new Date(movie.release_date))})
                </p>
                {/* <MovieAction movie.id={movie.id} rating like watch playlist send /> */}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
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
          <MovieCardRow movie={movie} />
        </Link>
      ) : (
        <div className="relative flex gap-4 items-center">
          <MovieCardRow movie={movie} />
        </div>
      )}
    </>
  );
}

export function MovieCardRow({ movie }: { movie: Movie }) {
  return (
    <>
      <MoviePoster
        className=" w-14 lg:w-[100px]"
        poster_path={'https://image.tmdb.org/t/p/w500/' + movie?.data[0].poster_path}
        alt={movie?.data[0].title ?? ''}
      />
      <div className="w-full block">
        {/* TITLE */}
        <h2 className="text-xl font-bold line-clamp-2">{movie?.data[0].title}</h2>

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
      </div>
    </>
  );
}
