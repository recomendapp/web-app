"use client"

import { useState } from "react";
import Link from "next/link";
import YoutubeEmbed from "@/components/utils/Youtube";

// UI
import { ImageWithFallback } from "@/components/utils/ImageWithFallback";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
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
import { ConvertHoursMinutes } from "@/lib/utils";

// ICONS
import { Play } from "lucide-react";
import { DateOnlyYearTooltip } from "@/components/utils/Date";
import { HeaderBox } from "@/components/Box/HeaderBox";
import PersonPoster from "./PersonPoster";


export default function PersonHeader({
  person,
} : {
  person: any,
}) {

  const randomBackdrop = (data: any) => {
    const allMovies = [...data.movie_credits.cast, ...data.movie_credits.crew];
    if (allMovies.length === 0)
      return (null);

    // Filtre les films avec backdrop_path
    const moviesWithBackdrop = allMovies.filter(movie => movie.backdrop_path);

    // Trie la liste filtrée par popularité en ordre décroissant
    const sortedMovies = moviesWithBackdrop.sort((a, b) => b.popularity - a.popularity);

    // Sélectionne les 10 films les plus connus
    const top10Movies = sortedMovies.slice(0, 10);

    // Choix aléatoire d'un film parmi les 10
    const randomMovie = top10Movies[Math.floor(Math.random() * top10Movies.length)];

    return (randomMovie.backdrop_path);
  }

  return (
      <div>
          <HeaderBox
            style={{backgroundImage: `url('https://image.tmdb.org/t/p/original/${randomBackdrop(person)}`}}
          >
                <div className="flex flex-col w-full gap-4 items-center @xl:flex-row">
                  {/* MOVIE POSTER */}
                  <PersonPoster className="w-[250px]" poster_path={`https://image.tmdb.org/t/p/w500/${person.profile_path}`} alt={person.name} />
                  {/* MOVIE MAIN DATA */}
                  <div className="flex flex-col gap-2 w-full">
                    {/* TYPE */}
                    <div>
                      {person.known_for_department}
                    </div>
                    {/* NAME */}
                    <div className="text-xl lg:text-6xl font-bold line-clamp-2">
                        <span>{person.name}</span>
                    </div>
                  </div>
                </div>
          </HeaderBox>
          {/* <div className='px-4 pb-4'>
              <MovieAction filmId={movie.id} all />
          </div> */}
      </div>
  )
}
