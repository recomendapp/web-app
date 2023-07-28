"use client"
import { useUser } from '@/context/user'
import { databases } from '@/utils/appwrite'
import { Query } from 'appwrite'
import { Models } from 'appwrite/types/models'
import React, { useEffect, useState } from 'react'

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { format } from "date-fns"
import { fr } from "date-fns/locale";
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { ImageWithFallback } from '@/components/ImageWithFallback'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Trash, Trash2 } from 'lucide-react'

export default function Guidelist() {

  const { user } = useUser()

  const [ guidelist, setGuidelist ] = useState<any>(null)

  useEffect(() => {
    user && databases.listDocuments(
        String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_USERS),
        String(process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_MOVIE_GUIDELISTED),
        [
          Query.limit(25),
          Query.equal('userId', user.$id)
        ]
      )
      .then((response) => {
        getMovieDetails(response.documents)
      })
  }, [user])

  const getMovieDetails = async (movieList: Models.Document[]) => {
    const moviesWithDetails = await Promise.all(movieList.map(async (movie: any) => {
      const details = await (await fetch(`${process.env.NEXT_PUBLIC_TMDB_API_URL}movie/${movie.movieId}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=${user.language}&append_to_response=credits`)).json();
      const directors = details.credits.crew.filter((member: any) => member.job === 'Director');
      const movieWithDetails = {
        ...movie,
        ...details,
        directors,

      };
      return movieWithDetails;
    }));
    setGuidelist(moviesWithDetails)
  }
  console.log('guidelist', guidelist) 
  const handleDeleteGuidelistedMovie = async (id: string) => {
    console.log('idmoive', id)
    databases.deleteDocument(
        String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_USERS),
        String(process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_MOVIE_GUIDELISTED),
        id
      )
      .then(() => {
        setGuidelist((currentList: any) => currentList.filter((movie: any) => movie.$id !== id))
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <main className='h-full'>
      <div>
        GUIDELIST
      </div>
      <Table>
        {/* <TableCaption>Mes films à voir</TableCaption> */}
        <TableHeader>
          <TableRow>
            <TableHead>Film</TableHead>
            <TableHead>Réalisateur</TableHead>
            <TableHead>Durée</TableHead>
            <TableHead>Date d&apos;ajout</TableHead>
            <TableHead className="text-right">Ajouté par</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {guidelist && guidelist.map((movie: any) => (
            <TableRow key={movie.id}>
              <Link href={"/movie/"+movie.id}>
                <TableCell className="font-medium p-4 flex items-center gap-4">
                  <div className="w-[30px]">
                    <AspectRatio ratio={2/3}>
                      <ImageWithFallback 
                        src={"https://image.tmdb.org/t/p/w500/"+movie.poster_path} 
                        alt={movie.title}
                        fill
                        className="rounded-md object-cover"
                      />
                    </AspectRatio>
                  </div>
                  {/* MOVIE DATA */}
                  <div className="w-fit p-0 h-full text-base">
                      {movie.title}
                  </div>
              
                </TableCell>
              </Link>
              <TableCell>
                {movie.directors.length ? movie.directors.map((director: any, index: number) => (
                    <span key={director.id}>
                        <Button variant="link" className="w-fit p-0 h-full text-accent-1 font-normal italic" asChild>
                            <Link href={`/person/${director.id}`}>
                                {director.name}
                            </Link>
                        </Button>
                        {index !== movie.directors.length - 1 && (
                        <span>, </span>
                        )}
                    </span>
                )) : (
                    <span className="w-fit p-0 h-full text-accent-1 font-normal italic">
                        Unknown
                    </span>
                )}
              </TableCell>
              <TableCell>{movie.runtime}min</TableCell>
              <TableCell>{format(new Date(movie.$createdAt), "PPP", { locale: fr })}</TableCell>
              <TableCell className="text-right">{movie.by.username} </TableCell>
              <TableCell onClick={() => handleDeleteGuidelistedMovie(movie.$id)}>
                  <Trash2 />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      

    </main>
  )
}