"use client"

import Image from "next/image"
import Link from "next/link"

// UI
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { ImageWithFallback } from "@/components/tools/ImageWithFallback"
import { Button } from "@/components/ui/button"


export default function MovieDescription ({ movie } : { movie: any}) {
    return (
        <div className="flex flex-col gap-4">         
            <div className='flex flex-col lg:grid grid-cols-4 gap-4'>
              {/* OVERVIEW */}
              <div className="flex flex-col gap-2 col-span-3">
                <h2 className='text-3xl font-bold'>Résumé 📙</h2>
                <div className=" text-justify">
                  {movie.overview}
                </div>
              </div>
              {/* STREAMING PLATEFORMS */}
              <div className="flex flex-col gap-2">
                <h2 className='text-3xl font-bold'>Voir le film</h2>
                <div className="flex gap-2">
                 <Image src={"https://images.justwatch.com/icon/207360008/s100"} className='rounded-md' width={25} height={25} alt={"demo"} />
                 <Image src={"https://images.justwatch.com/icon/147638351/s100"} className='rounded-md' width={25} height={25} alt={"demo"} />
                 <Image src={"https://images.justwatch.com/icon/52449861/s100"} className='rounded-md' width={25} height={25} alt={"demo"} />
                </div>
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
        </div>
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
        <div className='text-accent-1 italic text-sm text-center'>{person.character}</div>
      </Link>
    )
  }