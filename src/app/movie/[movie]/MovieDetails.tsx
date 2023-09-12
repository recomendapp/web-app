'use client';

import { AspectRatio } from '@/components/ui/aspect-ratio';
import { ImageWithFallback } from '@/components/ImageWithFallback';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useUser } from '@/context/user';
import { MovieAction } from '@/components/movie/action/MovieAction/MovieAction';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { MovieActionCounter } from '@/components/count/MovieActionCounter';
import { MovieReview } from './reviews/assets/MovieReviews'
import Image from 'next/image';
import { Play, PlayCircle, PlayCircleIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import YoutubeEmbed from '@/components/tools/Youtube';

export function MovieDetails({ movie }: { movie: any }) {
  const { user } = useUser();

  return (
    <div className="w-full">
      {/* CONTAINER */}
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
            <div className="w-[200px] shadow-md">
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
              <div className="text-xl lg:text-6xl font-bold">
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
                  {convertDuration(movie.runtime)}
                </span>
              </div>
              <div className='flex items-center gap-2'>
                <MovieActionCounter movieId={movie.id} />
                {movie.videos.results.length && <TrailerButton trailer={movie.videos} />}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* REACTIONS */}
      <div className='px-4 pb-4'>
        <MovieAction movieId={movie.id} userId={user?.$id} />
      </div>

      <MovieTabs movie={movie} />
      {/* <MovieReview movie={movie} /> */}
    </div>
  );
}

function TrailerButton({
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
        <DialogHeader className='flex flex-row gap-4 items-center'>
          <DialogTitle>Trailer</DialogTitle>
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
        </DialogHeader>
        <YoutubeEmbed embedId={selectedTrailer}/>
      </DialogContent>
    </Dialog>
  )
}

function MovieTabs({
  movie
} : {
  movie: any
}) {
  
  return (
    <Tabs defaultValue="description" className=" w-full px-4 pb-4">
        <TabsList className='w-full rounded-full'>
          <TabsTrigger value="description" className='w-full rounded-full'>Description</TabsTrigger>
          <TabsTrigger value="reviews" className='w-full rounded-full'>Critiques</TabsTrigger>
          <TabsTrigger value="playlists" className='w-full rounded-full'>Playlists</TabsTrigger>
        </TabsList>
        <TabsContent value="description" className="border-none p-0 outline-none flex flex-col gap-4">
          <h2 className='text-3xl font-bold'>Résumé 📙</h2>
          <div className='grid grid-cols-4 gap-4'>
            {/* OVERVIEW */}
            <div className="col-span-3 text-justify">
              {movie.overview}
            </div>
            {/* STREAMING PLATEFORMS */}
            <div>
              <Image src={"https://images.justwatch.com/icon/430997/s100"} className='rounded-md' width={25} height={25} alt={"demo"} />
            </div>
          </div>
          {/* CASTING */}
          <div className='flex flex-col gap-4'>
            <h2 className='text-3xl font-bold'>Casting ✨</h2>
            <ScrollArea>
              <div className="flex space-x-4 pb-4">
                {movie.credits.cast.map((person: any) => (
                    <CastPoster key={person.id} person={person} />
                ))}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
            <CrewModal crew={movie.credits.crew} />
          </div>
          {/* Média */}
          <div className='flex flex-col gap-4'>
            <h2 className='text-3xl font-bold'>Média 🎬</h2>
            <div>
              MEDIA
            </div>
          </div>
        </TabsContent>
        <TabsContent value="reviews" className="h-full flex-col border-none p-0 data-[state=active]:flex"
        >
          <MovieReview movie={movie} />
        </TabsContent>
      </Tabs>
  )
}

function CrewModal({
  crew
} : {
  crew: any
}) {
  return (
  <Dialog>
      <DialogTrigger asChild>
        <Button variant="link">Équipe de tournage complète 👨‍🔧</Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className='text-center'>CREW 👨‍🔧</DialogTitle>
        </DialogHeader>
        <ScrollArea className='h-[50vh] pr-4'>
          <div  className='grid grid-cols-4 gap-4'>
             {crew.map((person: any) => (
                <CrewPoster key={person.id} person={person} />
            ))}
          </div>
           
            <ScrollBar orientation="vertical" />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}

function CrewPoster({
  person
} : {
  person: any
}) {
  return (
    <Link
      key={person.username}
      href={'/person/' + person.id}
      className="flex flex-col items-center bg-secondary hover:bg-secondary-hover w-[100px] rounded-xl p-2 gap-2"
    >
      {/* AVATAR */}
      <div className="w-full shadow-2xl">
        <AspectRatio ratio={3 / 4}>
          <ImageWithFallback
            src={'https://image.tmdb.org/t/p/original/' + person.profile_path}
            alt={person.name}
            fill
            className="rounded-md object-cover"
          />
        </AspectRatio>
      </div>
      {/* NAME */}
      <div>{person.name}</div>
      <div className='text-accent-1 italic text-sm'>{person.job}</div>
    </Link>
  )
}

function CastPoster({
  person
} : {
  person: any
}) {
  return (
    <Link
      href={'/person/' + person.id}
      className="flex flex-col items-center bg-secondary hover:bg-secondary-hover w-[150px] rounded-xl p-2 gap-2"
    >
      {/* AVATAR */}
      <div className="w-full shadow-2xl">
        <AspectRatio ratio={3 / 4}>
          <ImageWithFallback
            src={'https://image.tmdb.org/t/p/original/' + person.profile_path}
            alt={person.name}
            fill
            className="rounded-md object-cover"
          />
        </AspectRatio>
      </div>
      {/* NAME */}
      <div>{person.name}</div>
      <div className='text-accent-1 italic text-sm'>{person.character}</div>
    </Link>
  )
}


function convertDuration(duration: number) {
  const hours = Math.floor(duration / 60);
  const remainingMinutes = duration % 60;

  return `${hours}h${remainingMinutes}`;
}
function convertDate(date: string) {
  const parts = date.split('-');
  const year = parts[0];
  const month = parts[1];
  const day = parts[2];

  return `${day}/${month}/${year}`;
}
