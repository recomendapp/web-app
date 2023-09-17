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

interface MovieCardProps {
    movie: any;
    displayMode?: string,
    isLiked?: boolean,
    isRated?: boolean,
    rating?: number,
    isReviewed?: boolean,
    review?: string,

}

export default function MovieCard({
    movie,
    displayMode,
    isLiked,
    isRated,
    rating,
    isReviewed,
    review
} : MovieCardProps) {

    if (displayMode == 'grid')
    {
        return (
        <TooltipProvider delayDuration={0}>
            <Tooltip>
                <TooltipTrigger asChild>
                    <div className="group transition flex gap-4 items-center relative border-2 border-transparent hover:border-accent-1 rounded-md">
                        <Link href={`/movie/${movie.id}`} className="w-full">
                            <MoviePoster poster_path={'https://image.tmdb.org/t/p/original/' + movie.poster_path} alt={movie.title}/>
                        </Link>
                        {(isRated || isReviewed || isLiked) && <div className="flex flex-col items-center gap-1 absolute right-0 top-[10%] bg-background p-1 rounded-l-md">
                            {isRated && 
                                <p
                                    className={`h-5 w-6 rounded-sm flex items-center justify-center
                                    text-background bg-accent-1
                                    font-bold text-sm
                                    `}
                                >
                                    {rating}
                                </p>
                            }
                            {isLiked && 
                                <Heart
                                    width={15}
                                    className={`text-like fill-like`}
                                />
                            }
                            {isReviewed &&
                                <Button variant={'action'} className="p-0 h-fit" asChild>
                                    <Link href={`/movie/${movie.id}/review/${review}`}>
                                        <Text width={20} className='fill-foreground'/>
                                    </Link>
                                </Button>
                            }
                        </div>}
                        <div className="hidden absolute top-3/4 group-hover:flex w-full justify-center pointer-events-none">
                            <div className="bg-background rounded-md w-fit pointer-events-auto">
                                <MovieAction movieId={movie?.id} watch watchlist dropdown/>
                            </div>
                        </div>
                    </div>
                </TooltipTrigger>
                <TooltipContent>
                    <p>{movie.title} ({getYear(new Date(movie.release_date))})</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
        )
    }


    return (
        <Link href={`/movie/${movie.id}`} className="flex gap-4 items-center">
            <MoviePoster width={90} poster_path={'https://image.tmdb.org/t/p/original/' + movie.poster_path} alt={movie.title}/>
            <div className="w-full block">
                {/* TITLE */}
                <h2 className="text-xl font-bold line-clamp-2">
                    {movie.title}
                </h2>
                
                {/* DATE / GENRES / RUNTIME */}
                <div className="line-clamp-1">
                    {movie.credits.crew
                        .filter(
                            (member: any) => member.job === 'Director'
                        )
                        .length ? (
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
                        )
                    }         
                </div>

                {/* DATE */}
                <p className="lg:hidden"><DateOnlyYearTooltip date={movie.release_date}/></p>
            </div>
        </Link>
    )
}