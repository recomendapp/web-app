"use client"
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { ImageWithFallback } from '@/components/ImageWithFallback';
import { Button } from '../ui/button';
import Link from 'next/link';
import { useUser } from '@/context/user';
import { MovieAction } from './action/MovieAction';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

import { format } from "date-fns"
import { fr } from "date-fns/locale";
import { MovieActionCounter } from '../count/MovieActionCounter';
import { MovieReview } from './MovieReview';

export function MovieDetails({ movie, movieDocumentID } : { movie: any, movieDocumentID: any }) {
    const { user } = useUser();
    console.log('user', user)
    console.log('movie', movie)
    
    return (
        <div className=' w-full'>
            {/* CONTAINER */}
            <div 
                className='bg-white'
                style={{
                    backgroundImage: `url('https://image.tmdb.org/t/p/original/${movie.backdrop_path}')`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    height:"clamp(340px,30vh,400px)"
                }}
            >
                <div className='w-full h-full flex  p-4 items-center bg-gradient-to-t from-background to-[#000000bd] bg-opacity-75'>
                    <div className='flex gap-4 items-center'>
                    
                        {/* MOVIE POSTER */}
                        <div className="w-[200px] shadow-md">
                            <AspectRatio ratio={2/3}>
                                <ImageWithFallback 
                                    src={"https://image.tmdb.org/t/p/original/"+movie.poster_path} 
                                    alt={movie.title}
                                    fill
                                    className="rounded-md object-cover"
                                />
                            </AspectRatio>
                        </div>
                        {/* MOVIE MAIN DATA */}
                        <div className='flex flex-col gap-2'>
                            {/* TYPE */}
                            <div>
                                Film
                            </div>
                            {/* TITLE */}
                            <div className='text-xl lg:text-6xl font-bold'>
                                <span>{movie.title}</span>
                            </div>
                            {/* DATE / GENRES / RUNTIME */}
                            <div>
                                {movie.credits.crew.filter((member: any) => member.job === 'Director').length ? movie.credits.crew.filter((member: any) => member.job === 'Director').map((director: any, index: number) => (
                                        <span key={director.id}>
                                            <Button variant="link" className="w-fit p-0 h-full font-bold " asChild>
                                                <Link href={`/person/${director.id}`}>
                                                    {director.name}
                                                </Link>
                                            </Button>
                                            {index !== movie.credits.crew.filter((member: any) => member.job === 'Director').length - 1 && (
                                            <span> • </span>
                                            )}
                                        </span>
                                    )) : (
                                        <span className="w-fit p-0 h-full font-bold">
                                            Unknown
                                        </span>
                                )}

                                {/* DATE */}
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <span className=" before:content-['_•_']">{movie.release_date.split('-')[0]}</span>
                                        </TooltipTrigger>
                                        <TooltipContent side='bottom'>
                                            {movie.release_date ? format(new Date(movie.release_date), "PPP", { locale: fr }) : "Unknown"}
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                                {/* GENRES */}
                                <span className=" before:content-['_•_']">
                                    {movie.genres.map((item: any, index: number) => (
                                    <span key={item.id}>
                                        <Button variant="link" className="w-fit p-0 h-full font-normal" asChild>
                                            <Link href={`/genre/${item.id}`}>
                                                {item.name}
                                            </Link>
                                        </Button>
                                        {index !== movie.genres.length - 1 && (
                                        <span>, </span>
                                        )}
                                    </span>
                                    ))}
                                </span>
                                {/* RUNTIME */}
                                <span className=" before:content-['_•_']">
                                    {convertDuration(movie.runtime)}
                                </span>
                            </div>
                            {/* REACTIONS */}
                            <MovieAction movieId={movie.id} userId={user?.$id} />
                            <div>
                                COUNTER
                                <MovieActionCounter movie={movieDocumentID}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <MovieReview movie={movie} movieDocumentID={movieDocumentID} />
        </div>
    )
}



function convertDuration(duration: number) {
    const hours = Math.floor(duration / 60);
    const remainingMinutes = duration % 60;
  
    return `${hours}h${remainingMinutes}`;
}
function convertDate(date: string) {
    const parts = date.split("-");
    const year = parts[0];
    const month = parts[1];
    const day = parts[2];
  
    return `${day}/${month}/${year}`;
  }