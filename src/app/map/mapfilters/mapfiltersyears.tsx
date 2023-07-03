import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

import { useUser } from "@/hooks/user"
import { Input } from "@/components/ui/input"


export function MapFiltersYears(props: any) {
  const {user } = useUser();
  const { closePopupMovie, map, genreList, setGenreList, activeGenres, setActiveGenres} = props;

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

  function resetFilters() {
      setActiveGenres({});
      setGenreList(genreList.map((genre: any) => {
          return {
          name: genre.name,
          enabled: false
          }
      }))
  }

  return (
          <AccordionItem value="item-2">
            <AccordionTrigger>Années</AccordionTrigger>
            <AccordionContent>
              <div className="flex items-center gap-2">
                <Input 
                  type="number"
                  min={1900}
                  max={2099}
                  step={1}
                  placeholder="1900"
                  inputMode="numeric"
                />
                à
                <Input 
                  type="number"
                  min={1900}
                  max={2099}
                  step={1}
                  placeholder="2023"
                  inputMode="numeric"
                />
              </div>
            </AccordionContent>
          </AccordionItem>
  )
}