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
import { AspectRatio } from "../ui/aspect-ratio";
import { ImageWithFallback } from "../tools/ImageWithFallback";
import { Button } from "../ui/button";
import Link from "next/link";

export default function MovieVerticalCard({ movie } : { movie:any }) {
    return (
        <div className="flex lg:flex-col gap-4 items-center">
            {/* MOVIE POSTER */}
            <div className="w-full shadow-md">
                <AspectRatio ratio={2 / 3}>
                    <ImageWithFallback
                    src={
                        'https://image.tmdb.org/t/p/original/' + movie.poster_path
                    }
                    alt={movie.title}
                    fill
                    className="rounded-md object-cover"
                    />
                </AspectRatio>
            </div>
            {/* MOVIE DATAT */}
            <div className="w-full">
                {/* TITLE */}
                <h2 className="text-xl lg:text-4xl font-bold break-words">
                    {movie.title}
                </h2>
                <div className="flex flex-col gap-2">
                    
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
    )
}