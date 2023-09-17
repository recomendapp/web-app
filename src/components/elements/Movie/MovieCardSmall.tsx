"use client"

// UI
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger
} from "@/components/ui/tooltip";

// DATE
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ImageWithFallback } from "@/components/elements/Tools/ImageWithFallback"
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { DateOnlyYearTooltip } from "@/components/elements/Date/Date";
import MoviePoster from "@/components/elements/Movie/MoviePoster";

export default function MovieCardSmall({ movie } : { movie:any }) {
    return (
        <Link href={`/movie/${movie.id}`} className="flex gap-4 items-center">
            {/* MOVIE POSTER */}
            <MoviePoster width={90} poster_path={'https://image.tmdb.org/t/p/original/' + movie.poster_path} alt={movie.title}/>
            {/* MOVIE DATAT */}
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