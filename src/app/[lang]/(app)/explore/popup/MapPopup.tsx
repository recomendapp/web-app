import Link from 'next/link';
import React, {
  Fragment,
  useState,
  useMemo,
  useRef,
  useEffect,
  useContext,
} from 'react';

import { Popup } from 'react-map-gl';

// ICONS
import {
  AiFillHeart,
  AiOutlineHeart,
  AiFillEye,
  AiOutlineEyeInvisible,
} from 'react-icons/ai';
import PopupFullScreen from './MapPopupFullScreen';
import MapPopupSidebar from './MapPopupSidebar';
import { getMovieDetails } from '@/lib/tmdb';
import { useAuth } from '@/context/AuthContext/AuthProvider';

export default function MapPopup(props: any) {
  const { selectedMovie } = props;

  const { user } = useAuth();

  const [recoverServerOffset, setRecoverServerOffset] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  console.log('POPUPPPP', selectedMovie);

  const [movieDetails, setMovieDetails] = useState<any>();

  useEffect(() => {
    getMovieDetails(selectedMovie.id, user ? user?.language : 'en-EN')
      .then((movieDetailsResponse) => {
        setMovieDetails(movieDetailsResponse);
        setIsLoading(false);
      })
      .catch((error: any) => {
        setIsLoading(false);
      });
  }, [selectedMovie, user]);

  if (isLoading) {
    return <></>;
  }

  return (
    <>
      {/* <div className=" z-10 absolute top-16 bottom-4 left-4 bg-red-500">
        SALUTR
      </div> */}
      <MapPopupSidebar selectedMovie={movieDetails} onClose={props.onClose} />
      {/* <PopupFullScreen selectedMovie={movieDetails} onClose={props.onClose}  /> */}
    </>
  );
}

/*
<div className="relative z-[9] pointer-events-none bg-blue-500">
      <MapPopupSidebar selectedMovie={movieDetails} onClose={props.onClose} />
      <div className="lg:hidden">
        <PopupFullScreen selectedMovie={movieDetails} onClose={props.onClose}  />
      </div>
      {/* {displayMode == 'desktop' && (
        <MapPopupSidebar selectedMovie={movieDetails} onClose={props.onClose} />
      )}
      {displayMode !== 'desktop' && (
        <PopupFullScreen selectedMovie={movieDetails} onClose={props.onClose}  />
      )} 
      </div>
      */
