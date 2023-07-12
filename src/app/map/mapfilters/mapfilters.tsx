import { useEffect, useState } from "react"

import { Filter } from "lucide-react"

import { Button } from "@/components/ui/button"

import { 
    Popover,
    PopoverTrigger,
    PopoverContent

} from "@/components/ui/popover"

import {
  Accordion
} from "@/components/ui/accordion"

import { useUser } from "@/context/user"
import { getGenreList } from '@/hooks/tmdb';
import { MapFiltersGenres } from "./mapfiltersgenres"
import { MapFiltersYears } from "./mapfiltersyears"



interface MapFilterProps extends React.HTMLAttributes<HTMLDivElement> {
    skeleton?: boolean;
}

export function MapFilters(props: any) {
  const {user } = useUser();
  const { closePopupMovie, map} = props;
  const [ genreList, setGenreList ] = useState<any[]>([]);
  const [ activeGenres, setActiveGenres ] = useState<Record<string, boolean>>({});

  // INIT LIST OF GENRES
  useEffect(() => {
    getGenreList(user ? user.language : 'fr-FR')
        .then((response) => {
            setGenreList(response.map(genre => {
                return {
                    name: genre.name,
                    enabled: false
                }
            }))
        })
        .catch((error) => console.log(error))
  }, [user])

  return (
      <Popover>
      <PopoverTrigger asChild>
        <Button 
          variant="default" 
          size="icon" 
          className="relative h-8 w-8 rounded-full"
        >
            <Filter className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 mr-4">
        <Accordion type="single" collapsible className="grid gap-4">
          <MapFiltersGenres 
            closePopupMovie={closePopupMovie} 
            map={map} 
            genreList={genreList} 
            setGenreList={(e: any) => setGenreList(e)}
            activeGenres={activeGenres}
            setActiveGenres={(e: any) => setActiveGenres(e)}
          />
          <MapFiltersYears 
            closePopupMovie={closePopupMovie} 
            map={map} 
            genreList={genreList} 
            setGenreList={(e: any) => setGenreList(e)}
            activeGenres={activeGenres}
            setActiveGenres={(e: any) => setActiveGenres(e)}
          />
        </Accordion>
      </PopoverContent>
    </Popover>
  )
}