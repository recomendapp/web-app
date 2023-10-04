"use client"

// UI
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger
} from "@/components/ui/tooltip";

// DATE
import { format, getYear } from 'date-fns';
import { fr } from 'date-fns/locale';
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ImageWithFallback } from "@/components/elements/Tools/ImageWithFallback"
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { DateOnlyYearTooltip } from "@/components/elements/Date/Date";
import MoviePoster from "@/components/elements/Movie/MoviePoster";
import { AlignJustify, Heart, Quote, Text } from "lucide-react";
import { MovieAction } from "@/components/modules/MovieAction/MovieAction";
import { Film, FilmAction } from "@/types/type.film";
import { getMovieDetails } from "@/hooks/tmdb";
import { useQuery } from "react-query";

interface MovieCardProps {
    filmId: string;
    displayMode?: string,
    film_action?: FilmAction

}

export default function MovieCard({
    filmId,
    displayMode,
    film_action
} : MovieCardProps) {

    const {
        data: film,
        isLoading,
      } = useQuery({
        queryKey: ['film', filmId],
        queryFn: () => getMovieDetails(filmId, 'en'),
        enabled: filmId !== undefined && filmId !== null,
    });

    if (!film)
        return null

    

    if (displayMode == 'grid')
    {
        return (
            <TooltipProvider delayDuration={0}>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <div className="group transition flex gap-4 items-center relative border-2 border-transparent hover:border-accent-1 rounded-md">
                            <Link href={`/film/${filmId}`} className="w-full">
                                <MoviePoster poster_path={film.poster_path} alt={film.title}/>
                            </Link>
                            {(film_action?.rating || film_action?.review_id || film_action?.is_liked) && <div className="flex flex-col items-center gap-1 absolute right-0 top-[10%] bg-background p-1 rounded-l-md">
                                {film_action?.rating && 
                                    <p
                                        className={`h-5 w-6 rounded-sm flex items-center justify-center
                                        text-background bg-accent-1
                                        font-bold text-sm
                                        `}
                                    >
                                        {film_action?.rating}
                                    </p>
                                }
                                {film_action?.is_liked && 
                                    <Heart
                                        width={15}
                                        className={`text-like fill-like`}
                                    />
                                }
                                {film_action?.review_id &&
                                    <Button variant={'action'} className="p-0 h-fit" asChild>
                                        <Link href={`/@${film_action?.user.username}/film/${film.id}`}>
                                            <Text width={20} className='fill-foreground'/>
                                        </Link>
                                    </Button>
                                }
                            </div>}
                            <div className="hidden absolute top-3/4 group-hover:flex w-full justify-center pointer-events-none">
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
    }


    return (
        <Link href={`/film/${film.id}`} className="relative flex gap-4 items-center">
            <MoviePoster width={100} poster_path={'https://image.tmdb.org/t/p/original/' + film.poster_path} alt={film.title}/>
            <div className="w-full block">
                {/* ACTIONS */}
                <div className="absolute top-0 flex items-center gap-2">
                    {film_action.rating && 
                        <p
                            className={`h-5 w-6 rounded-sm flex items-center justify-center
                            text-background bg-accent-1
                            font-bold text-sm
                            `}
                        >
                            {film_action.rating}
                        </p>
                    }
                    {film_action.is_liked && 
                        <Heart
                            width={15}
                            className={`text-like fill-like`}
                        />
                    }
                </div>
                {/* TITLE */}
                <h2 className="text-xl font-bold line-clamp-2">
                    {film.title}
                </h2>
                    
                
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
                <p className="lg:hidden"><DateOnlyYearTooltip date={film.release_date}/></p>
            </div>
        </Link>
    )
}