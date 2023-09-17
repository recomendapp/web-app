"use client"

import { useState } from "react";
import Link from "next/link";
import { MovieActionCounter } from "@/components/elements/Movie/MovieActionCounter";
import { useUser } from "@/context/UserProvider";
import { MovieAction } from "@/components/modules/MovieAction/MovieAction";
import YoutubeEmbed from "@/components/tools/Youtube";

// UI
import { ImageWithFallback } from "@/components/elements/Tools/ImageWithFallback";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"


// DATE
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { ConvertHoursMinutes } from "@/lib/utils/utils";

// ICONS
import { Play } from "lucide-react";
import { useQuery } from "react-query";
import { DateOnlyYearTooltip } from "@/components/elements/Date/Date";
import MoviePoster from "@/components/elements/Movie/MoviePoster";


export default function MovieHeader({ movie, small } : { movie: any, small?: boolean }) {

  const { user } = useUser();

  if (small) {
    return <MovieHeaderSmall movie={movie} />
  }

  return (
      <div>
          <div
              className="bg-white"
              style={{
              backgroundImage: `url('https://image.tmdb.org/t/p/original/${movie.backdrop_path}')`,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              height: 'clamp(340px,30vh,400px)',
              }}
          >
              <div className="w-full h-full flex  p-4 items-center bg-gradient-to-t from-background to-[#000000bd] bg-opacity-75">
              <div className="flex gap-4 items-center">
                  {/* MOVIE POSTER */}
                  <MoviePoster width={200} poster_path={movie.poster_path} alt={movie.title} />
                  {/* <div className="w-[200px] shadow-md">
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
                  </div> */}
                  {/* MOVIE MAIN DATA */}
                  <div className="flex flex-col gap-2">
                  {/* TYPE */}
                  <div>Film</div>
                  {/* TITLE */}
                  <div className="text-xl lg:text-6xl font-bold">
                      <span>{movie.title}</span>
                  </div>
                  {/* DATE / GENRES / RUNTIME */}
                  <div>
                      {movie.credits.crew.filter(
                      (member: any) => member.job === 'Director'
                      ).length ? (
                      movie.directors
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
                      <DateOnlyYearTooltip date={movie.release_date} inline />
                      {/* GENRES */}
                      <span className=" before:content-['_•_']">
                      {movie.genres.map((item: any, index: number) => (
                          <span key={item.id}>
                          <Button
                              variant="link"
                              className="w-fit p-0 h-full font-normal"
                              asChild
                          >
                              <Link href={`/genre/${item.id}`}>{item.name}</Link>
                          </Button>
                          {index !== movie.genres.length - 1 && <span>, </span>}
                          </span>
                      ))}
                      </span>
                      {/* RUNTIME */}
                      <span className=" before:content-['_•_']">
                      {ConvertHoursMinutes(movie.runtime)}
                      </span>
                  </div>
                  <div className='flex items-center gap-2'>
                      <MovieActionCounter movieId={movie.id} />
                      {movie.videos.results.length && <MovieTrailerButton trailer={movie.videos} />}
                  </div>
                  </div>
              </div>
              </div>
          </div>
          <div className='px-4 pb-4'>
              <MovieAction movieId={movie.id} all />
          </div>
      </div>
  )
}



export function MovieTrailerButton({
    trailer
  } : {
    trailer: any
  }) {
    const [ selectedTrailer, setSelectedTailer ] = useState<string>(trailer.results.toReversed()[0].key);
    
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant={"ghost"} className='w-fit flex gap-2 p-2'>
            <Play fill='black' size="icon" className='bg-white rounded-full p-1'/>
            Trailer
          </Button>
        </DialogTrigger>
        <DialogContent className=' max-w-[80vw]'>
          <DialogHeader className='relative flex flex-row gap-4 items-center'>
            <div className='absolute w-full flex justify-center -top-16'>
              <h2 className="text-accent-1-foreground text-5xl font-bold rounded-md bg-accent-1 px-4 py-2">TRAILER</h2>
            </div>
            <div className=" pt-4">
              <Select onValueChange={setSelectedTailer} defaultValue={selectedTrailer}>
                <SelectTrigger className="w-fit">
                  <SelectValue placeholder="Langue" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {trailer.results.toReversed().map((video: any) => (
                      <SelectItem key={video.key} value={video.key}>{video.name}</SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            
          </DialogHeader>
          <YoutubeEmbed embedId={selectedTrailer}/>
        </DialogContent>
      </Dialog>
    )
}

export function MovieHeaderSmall ({ movie } : { movie: any}) {
  return (
    <div
      className="bg-white"
      style={{
      backgroundImage: `url('https://image.tmdb.org/t/p/original/${movie.backdrop_path}')`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      height: 'clamp(150px,30vh,200px)',
      }}
    >
        <div className="w-full h-full flex  p-4 items-center bg-gradient-to-t from-background to-[#000000bd] bg-opacity-75">
        <div className="flex gap-4 items-center">
            {/* MOVIE POSTER */}
            <div className="w-[100px] shadow-md">
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
            {/* MOVIE MAIN DATA */}
            <div className="flex flex-col gap-2">
              {/* TYPE */}
              <div>Film</div>
              {/* TITLE */}
              <div className="text-xl lg:text-4xl font-bold">
                  <span>{movie.title}</span>
              </div>
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
    </div>
  )
}