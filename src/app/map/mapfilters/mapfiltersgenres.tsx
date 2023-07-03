import { useEffect, useState } from "react"

import { Filter, RotateCw } from "lucide-react"

import { Button } from "@/components/ui/button"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

import Link from "next/link"
import { useUser } from "@/hooks/user"
import { getGenreList } from '@/hooks/tmdb';

interface MapFilterProps extends React.HTMLAttributes<HTMLDivElement> {
    skeleton?: boolean;
}

export function MapFiltersGenres(props: any) {
  const {user } = useUser();
  const { closePopupMovie, map, genreList, setGenreList, activeGenres, setActiveGenres} = props;
  // const [ genreList, setGenreList ] = useState<any[]>([]);
  // const [ activeGenres, setActiveGenres ] = useState<Record<string, boolean>>({});
  
  // Update Movie Database when selected genres change
  useEffect(() => {
    if (Object.keys(activeGenres).length) {
        map.setFilter('markers-layer', ['in', ['get', 'Genre'], ['literal', Object.keys(activeGenres)]]);
        
    } else {
        map && map.setFilter('markers-layer', null);
    }

  }, [activeGenres])

  

  function handleGenreClick(genre: string | number) {
      const newActiveGenres = {...activeGenres};
      if (newActiveGenres[genre]) {
        delete newActiveGenres[genre];
      } else {
        newActiveGenres[genre] = true;
      }
      setActiveGenres(newActiveGenres);
  }

  function resetActiveGenres() {
      setActiveGenres({});
      setGenreList(genreList.map((genre: any) => {
          return {
          name: genre.name,
          enabled: false
          }
      }))
  }

  return (
          <AccordionItem value="item-1" className="">
            <AccordionTrigger>Genres</AccordionTrigger>
            <AccordionContent>
              <div className="grid grid-cols-2 gap-2">
                <Button 
                  onClick={() => {
                      closePopupMovie()
                      resetActiveGenres()
                  }}
                  variant={Object.keys(activeGenres).length === 0 ? "secondary" : "destructive"}
                  size={"sm"}
                  className='rounded-full'
                  disabled={Object.keys(activeGenres).length === 0 ? true : false}
                >
                  <RotateCw />
                </Button>
                {genreList.map((genre: any) => (
                    <Button 
                        key={genre.id}
                        id={genre.id}
                        onClick={() => {
                            genre.enabled = !genre.enabled;
                            closePopupMovie()
                            handleGenreClick(genre.name);
                            
                        }}
                        variant={genre.enabled ? "default" : "secondary"}
                        size={"sm"}
                        className='rounded-full'
                    >
                        {genre.name}
                    </Button>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
  )
}