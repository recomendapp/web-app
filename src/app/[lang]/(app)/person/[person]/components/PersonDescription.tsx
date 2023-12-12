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
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectSeparator, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { ImageWithFallback } from "@/components/utils/ImageWithFallback"
import { Button } from "@/components/ui/button"
import MovieCard from "@/components/Film/Card/MovieCard"
import { LayoutGrid, List } from "lucide-react"
import { useEffect, useState } from "react"




export default function PersonDescription({
  person
} : {
  person: any
}) {
    return (
        <div className="flex flex-col gap-4">         
            {/* <div className="flex flex-col gap-2 col-span-3">
              <h2 className='text-3xl font-bold'>Biographie</h2>
              <div className=" text-justify">
                {person.biography}
              </div>
            </div> */}

            {/* MOVIES */}
            <PersonMovies person={person}/>
        </div>
    )
}

export function PersonMovies({
  person
} : {
  person: any
}) {
  const extractRoles = (movies: any[]): string[] => {
    const roles = movies
        .filter(movie => movie.job) // Filtrer les films avec un rôle défini
        .map(movie => movie.job); // Assurer une correspondance insensible à la casse
    if (person.movie_credits.cast?.length > 0) {
        roles.push("Actor");
    }
    return Array.from(new Set(roles)).sort(); // Renvoyer une liste unique de rôles
  };

    const allMovies = [...person.movie_credits.cast, ...person.movie_credits.crew];
    const roles = extractRoles(allMovies);
    const [displayMode, setDisplayMode] = useState<'grid' | 'row'>('grid');
    const [roleFilter, setRoleFilter] = useState<string | undefined>(roles[0]);
    const [order, setOrder] = useState("date-desc");
    const [sortedMovies, setSortedMovies] = useState<any[]>([]);

    const sortMovies = (movies: any[]): any[] => {
        switch (order) {
          case "date-desc":
              return movies.sort((a, b) => new Date(b.release_date).getTime() - new Date(a.release_date).getTime());
          case "date-asc":
              return movies.sort((a, b) => new Date(a.release_date).getTime() - new Date(b.release_date).getTime());
          case "popularity-desc":
              return movies.sort((a, b) => b.vote_average - a.vote_average);
          case "popularity-asc":
              return movies.sort((a, b) => a.vote_average - b.vote_average);
          default:
              return movies;
        }
    };

    useEffect(() => {
       const filteredMovies = roleFilter
        ? roleFilter.toLowerCase() === "actor"
            ? person.movie_credits.cast
            : allMovies.filter(movie => movie.job && movie.job.toLowerCase() === roleFilter.toLowerCase())
        : allMovies;
      const sorted = sortMovies(filteredMovies);
      setSortedMovies(sorted);
    }, [order, roleFilter]);



    return (
      <div className='flex flex-col gap-4'>
        <div className="flex items-center justify-between gap-4">
          <h2 className='text-3xl font-bold'>Films</h2>
          <div className="flex gap-2">
            <Select onValueChange={setRoleFilter} defaultValue={roleFilter}>
                <SelectTrigger className="w-fit">
                    <SelectValue />
                </SelectTrigger>
                <SelectContent align="end">
                    <SelectGroup>
                        <SelectLabel>Role</SelectLabel>
                        {extractRoles(allMovies).map((role) => (
                            <SelectItem key={role} value={role}>
                                {role}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
            <Select onValueChange={setOrder} defaultValue={order}>
                <SelectTrigger className="w-fit">
                    <SelectValue />
                </SelectTrigger>
                <SelectContent align="end">
                    <SelectGroup>
                        <SelectLabel>Date de sortie</SelectLabel>
                        <SelectItem value={"date-desc"}>Plus récentes</SelectItem>
                        <SelectItem value={"date-asc"}>Plus anciennes</SelectItem>
                    </SelectGroup>
                    <SelectSeparator />
                    <SelectGroup>
                        <SelectLabel>Popularite</SelectLabel>
                        <SelectItem value={"popularity-desc"}>Plus populaires</SelectItem>
                        <SelectItem value={"popularity-asc"}>Plus meconnus</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
            <Button variant={'ghost'} onClick={() => setDisplayMode(displayMode == 'grid' ? 'row' : 'grid')}>
                {displayMode == 'grid' ?
                    <LayoutGrid />
                :
                    <List />
                }
            </Button>
          </div> 
        </div>
        <div className={` gap-2
            ${displayMode == 'row' ? 'flex flex-col' : 'grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 2xl:grid-cols-8'}
        `}
        >
          {sortedMovies.map((film: any, index) => (
            <MovieCard
              key={index}
              filmId={film.id}
              displayMode={displayMode}
            />
          ))}
        </div>
      </div>
    )
}