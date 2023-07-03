import Link from "next/link";
import React, { Fragment, useState, useMemo, useRef, useEffect, useContext } from 'react';
import Image from "next/image";

// COMPONENTS
import MovieRating from '../../movie/MovieRating'
import MovieLike from "../../movie/MovieLike";
import MovieWatch from "../../movie/MovieWatch";

// STYLES
import styles from './MapPopupSidebar.module.css'

// ICONS
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { X } from "lucide-react";

export default function MapPopupSidebar(props: any) {

  const [recoverServerOffset, setRecoverServerOffset] = useState(false);
  const { selectedMovie, onClose } = props;

  const [popupIsOpen, setPopupIsOpen] = useState(true)
  const popupSidebarRef = useRef<HTMLDivElement>(null);
  // const headerRef = useRef<HTMLDivElement>(null);  

  // const autoClose = (event: MouseEvent) => {
  //   // DETECTE CLICK OUTSIDE SEARBAR
  //   if (popupSidebarRef.current && !popupSidebarRef.current.contains(event.target as Node)) {
  //     setPopupIsOpen(false)
  //     onClose()
  //   }
  // };

  // useEffect(() => {
  //   document.addEventListener('click', autoClose);
  // }, []);


  if (!popupIsOpen) {
    return <></>
  }

  console.log('selectedMovie', selectedMovie)

  return (
    <div 
      ref={popupSidebarRef} 
      className="
        absolute z-20 top-16 bottom-4 left-4 bg-background 
        rounded-2xl pointer-events-auto 
        hidden md:block
        w-2/5 lg:w-1/3
        overflow-hidden
        overflow-y-auto

      "
    >
      
      <div className="relative">
        {/* CROSS */}
        <Button 
          variant="default" 
          size="icon" 
          className="absolute h-8 w-8 rounded-full top-2 right-2 z-10"
          onClick={() => onClose()}
        >
            <X className="h-4 w-4" />
        </Button>
        {/* BACKDROP */}
        <div className={`${styles.backdrop}`}>
          <AspectRatio ratio={16/9} className="">
            <Image  
              src={"https://image.tmdb.org/t/p/w500/"+selectedMovie.backdrop_path} 
              alt={selectedMovie.title}
              fill
              className="object-cover"
            />
          </AspectRatio>
        </div>
        <div className="-mt-[150px] px-4">
          <div className="flex items-end gap-4">
            {/* POSTER */}
            <div className="w-[150px] overflow-hidden rounded-lg z-10">
              <AspectRatio ratio={2/3} className="-z-[1]">
                <Image  
                  src={"https://image.tmdb.org/t/p/w500/"+selectedMovie.poster_path} 
                  alt={selectedMovie.title}
                  fill
                  className="object-cover"
                />
              </AspectRatio>
            </div>
            <div className="z-10">
              {/* TITLE */}
              <div>
                {selectedMovie.title}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}