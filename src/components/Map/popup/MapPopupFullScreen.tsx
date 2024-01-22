import Link from 'next/link';
import React, {
  Fragment,
  useState,
  useMemo,
  useRef,
  useEffect,
  useContext,
} from 'react';
import Image from 'next/image';

// COMPONENTS
// import MovieRating from '../../movie/[movie]/MovieRating'
// import MovieLike from "../../movie/[movie]/MovieLike";
// import MovieWatch from "../../movie/[movie]/MovieWatch";

// ICONS
import {
  AiFillHeart,
  AiOutlineHeart,
  AiFillEye,
  AiOutlineEyeInvisible,
} from 'react-icons/ai';
import { FaStar } from 'react-icons/fa';
import { Button } from '@/components/ui/button';

export default function MapPopupFullScreen(props: any) {
  const [recoverServerOffset, setRecoverServerOffset] = useState(false);
  const { selectedMovie, onClose } = props;

  const [popupIsOpen, setPopupIsOpen] = useState(true);
  const popupFullScreenRef = useRef<HTMLDivElement>(null);
  const [menuPosition, setMenuPosition] = useState(1);
  const [menuPositionOnDown, setMenuPositionOnDown] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(0);

  useEffect(() => {
    popupFullScreenRef.current &&
      setMenuPosition(popupFullScreenRef.current?.clientHeight - 330);
  }, []);

  const autoClose = (event: MouseEvent) => {
    // DETECTE CLICK OUTSIDE SEARBAR
    if (
      popupFullScreenRef.current &&
      !popupFullScreenRef.current.contains(event.target as Node)
    ) {
      setPopupIsOpen(false);
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener('click', autoClose);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleMouseDown(e: any) {
    setMenuPositionOnDown(menuPosition);
    setIsDragging(true);
    setDragStart(e.clientY);
  }

  function handleMouseMove(e: any) {
    if (!isDragging) return;
    const newPosition = e.clientY - dragStart;
    if (
      popupFullScreenRef.current &&
      menuPositionOnDown + newPosition >= 0 &&
      menuPositionOnDown + newPosition <=
        popupFullScreenRef.current?.clientHeight - 100
    ) {
      setMenuPosition(menuPositionOnDown + newPosition);
    }
    if (
      popupFullScreenRef.current &&
      menuPositionOnDown + newPosition >=
        popupFullScreenRef.current?.clientHeight - 30
    ) {
      setPopupIsOpen(false);
      onClose();
    }
  }

  function handleMouseUp(e: any) {
    setDragStart(menuPosition);
    setIsDragging(false);
  }

  if (!popupIsOpen) {
    return <></>;
  }

  return (
    <div
      ref={popupFullScreenRef}
      className={`fixed w-full bottom-0 z-10 pointer-events-none md:hidden `}
    >
      <div
        style={{ transform: 'translateY(' + menuPosition + 'px)' }}
        className={` rounded-t-xl pointer-events-auto bg-[#0e0e0e] pb-navbar text-white flex flex-col items-center overflow-hidden`}
        onMouseDown={(e) => handleMouseDown(e)}
        onMouseMove={(e) => handleMouseMove(e)}
        onMouseUp={(e) => handleMouseUp(e)}
        onTouchStart={(e) => handleMouseDown(e.touches[0])}
        onTouchMove={(e) => handleMouseMove(e.touches[0])}
        onTouchEnd={(e) => handleMouseUp(e.touches[0])}
      >
        {/* SEPARATOR */}
        <div className="py-2">
          <div className="bg-[#8d8d8d] rounded-full w-[10vw] h-[2px]"></div>
        </div>
        <div className="px-3 w-full">
          <Button onClick={() => console.log('YOOO CLICK')}>YOO</Button>
          <div className="grid grid-cols-2 gap-4 w-full ">
            {/* POSTER */}
            <div className="">
              <Image
                src={
                  'https://image.tmdb.org/t/p/w500/' + selectedMovie.poster_path
                }
                alt={selectedMovie.title}
                width={100}
                height={100}
                className="rounded-md w-full object-cover"
              />
            </div>
            {/* MAIN DETAILS */}
            <div className="flex flex-col my-2">
              <div className=" font-semibold text-xl">
                {selectedMovie.title}
              </div>

              <div className="flex items-center text-[#ffc830] font-semibold text-sm mt-2">
                <FaStar color="yellow" className="mr-1" />
                <div>{selectedMovie.vote_average.toFixed(1)}</div>
              </div>

              <div className="mt-2">
                {selectedMovie.crew
                  .filter((person: any) => person.job === 'Director')
                  .map((director: any) => director.name)
                  .join(', ')}
              </div>
            </div>
          </div>
          {/* OVERVIEW */}
          <div className="mt-2">
            <div>Résumé</div>
            <div className="text-justify">{selectedMovie.overview}</div>
          </div>
          {/* OVERVIEW */}
          <div className="mt-2">
            <div>Résumé</div>
            <div className="text-justify">{selectedMovie.overview}</div>
          </div>
          {/* OVERVIEW */}
          <div className="mt-2">
            <div>Résumé</div>
            <div className="text-justify">{selectedMovie.overview}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
