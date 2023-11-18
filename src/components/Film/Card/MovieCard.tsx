"use client"

// UI
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger
} from "@/components/ui/tooltip";

// DATE
import { getYear } from 'date-fns';
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { DateOnlyYearTooltip } from "@/components/tools/Date";
import MoviePoster from "@/components/Film/MoviePoster";
import { Heart, Text } from "lucide-react";
import { MovieAction } from "@/components/Film/FilmAction/MovieAction";
import { FilmAction } from "@/types/type.film";
import { getMovieDetails } from "@/lib/tmdb/tmdb";
import { useQuery } from "react-query";
import { useLocale } from "next-intl";

interface MovieCardProps {
    filmId: number;
    displayMode?: 'grid' | 'row',
    link?: boolean,
    movieActivity?: FilmAction
}

export default function MovieCard({
    filmId,
    displayMode,
    link = true,
    movieActivity,
} : MovieCardProps) {

    const locale = useLocale();

    const {
        data: film,
        isLoading,
      } = useQuery({
        queryKey: ['film', filmId],
        queryFn: () => getMovieDetails(filmId, locale),
        enabled: !!filmId,
    });

    if (!film)
        return null

    if (displayMode == 'grid')
        return (
            <TooltipProvider delayDuration={0}>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <div className="group transition flex gap-4 items-center relative border-2 border-transparent hover:border-accent-1 rounded-md">
                            <Link href={`/film/${filmId}`} className="w-full">
                                <MoviePoster poster_path={'https://image.tmdb.org/t/p/w500/' + film.poster_path}alt={film.title}/>
                            </Link>
                            {/* ACTIONS */}
                            {movieActivity &&
                                <Link href={`/@${movieActivity?.user.username}/film/${film.id}`} className="flex flex-col items-center gap-1 absolute right-0 top-[10%] bg-background p-1 rounded-l-md">
                                    {movieActivity?.rating && 
                                        <p
                                            className={`h-5 w-6 rounded-sm flex items-center justify-center
                                            text-background bg-accent-1
                                            font-bold text-sm
                                            `}
                                        >
                                            {movieActivity?.rating}
                                        </p>
                                    }
                                    {movieActivity?.is_liked && 
                                        <Heart
                                            width={15}
                                            className={`text-like fill-like`}
                                        />
                                    }
                                    {movieActivity?.review &&
                                        <Text width={20} className='fill-foreground'/>
                                    }
                                </Link>
                            }
                            <div className="hidden absolute top-3/4 group-hover:lg:flex w-full justify-center pointer-events-none">
                                <div className="bg-background rounded-md w-fit pointer-events-auto">
                                    <MovieAction filmId={filmId} watch watchlist dropdown/>
                                </div>
                            </div>
                        </div>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>{film.title} ({getYear(new Date(film.release_date))})</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        )

    return (
        <>
        {link ?
            <Link href={`/film/${film.id}`} className="relative flex gap-4 items-center">
                <MovieCardRow film={film}/>
            </Link>
        :
            <div className="relative flex gap-4 items-center">
                <MovieCardRow film={film} />
            </div>
        }
        </>
    )
    
}

export function MovieCardRow({
    film,
} : {
    film: any,
}) {

    return (
        <>
            <MoviePoster className=" w-14 lg:w-[100px]" poster_path={'https://image.tmdb.org/t/p/w500/' + film.poster_path} alt={film.title}/>
            <div className="w-full block">
                {/* ACTIONS */}
                {/* <div className="absolute top-0 flex items-center gap-2">
                    {film_action?.rating && 
                        <p
                            className={`h-5 w-6 rounded-sm flex items-center justify-center
                            text-background bg-accent-1
                            font-bold text-sm
                            `}
                        >
                            {film_action.rating}
                        </p>
                    }
                    {film_action?.is_liked && 
                        <Heart
                            width={15}
                            className={`text-like fill-like`}
                        />
                    }
                </div> */}
                {/* TITLE */}
                <h2 className="text-xl font-bold line-clamp-2">
                    {film.title}
                </h2>

                <div className="line-clamp-1">
                    {film.directors.map((director: any, index: number) => (
                        <span key={director.id}>
                            <Button
                                variant="link"
                                className="w-fit p-0 h-full hover:underline"
                                asChild
                            >
                                <Link href={`/person/${director.id}`}>
                                    {director.name}
                                </Link>
                            </Button>
                            {index !== film.directors.length -
                                1 && <span> • </span>}
                        </span>
                    ))}
                </div>
                    
                
                {/* DATE / GENRES / RUNTIME */}
                {/* <div className="line-clamp-1">
                    {film.credits.crew
                        .filter(
                            (member: any) => member.job === 'Director'
                        )
                        .length ? (
                            film.credits.crew
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
                        )
                    }         
                </div> */}

                {/* DATE */}
                <DateOnlyYearTooltip date={film.release_date}/>
            </div>
        </>
    )
}