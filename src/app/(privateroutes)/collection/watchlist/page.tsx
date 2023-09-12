'use client';
import { useUser } from '@/context/user';
import { databases } from '@/utils/appwrite';
import { Query } from 'appwrite';
import { Models } from 'appwrite/types/models';
import React, { useEffect, useState } from 'react';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { ImageWithFallback } from '@/components/ImageWithFallback';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Clipboard, Clock } from 'lucide-react';
import { TableWatchlist } from '@/components/table/watchlist/TableWatchlist';
import { useQuery } from 'react-query';
import { handleGetWatchlist } from '@/api/movie/movie_watchlist';

export default function Watchlist() {
  const { user } = useUser();

  const {
    data: watchlist,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['collection', 'watchlist'],
    queryFn: () => handleGetWatchlist(user),
    enabled: user?.$id !== undefined && user?.$id !== null,
  });
  // const [watchlist, setWatchlist] = useState<any>(null);

  // useEffect(() => {
  //   user &&
  //     databases
  //       .listDocuments(
  //         String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_USERS),
  //         String(process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_MOVIE_WATCHLISTED),
  //         [Query.limit(25), Query.equal('userId', user.$id)]
  //       )
  //       .then((response) => {
  //         getMovieDetails(response.documents);
  //       });
  // }, [user]);

  // const getMovieDetails = async (movieList: Models.Document[]) => {
  //   const moviesWithDetails = await Promise.all(
  //     movieList.map(async (movie: any) => {
  //       const details = await (
  //         await fetch(
  //           `${process.env.NEXT_PUBLIC_TMDB_API_URL}movie/${movie.movieId}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=${user.language}&append_to_response=credits`
  //         )
  //       ).json();
  //       const directors = details.credits.crew.filter(
  //         (member: any) => member.job === 'Director'
  //       );
  //       const movieWithDetails = {
  //         ...movie,
  //         ...details,
  //         directors,
  //       };
  //       return movieWithDetails;
  //     })
  //   );
  //   setWatchlist(moviesWithDetails);
  // };

  return (
    <main className="h-full">
      <WatchlistHeader data={watchlist} />
      {/* <TestTable guidelist={guidelist} /> */}
      {/* <TableGuidelist /> */}
      <div className='p-4'>
        {watchlist && <TableWatchlist data={watchlist} />}
      </div>
      {/* <TableGuidelist /> */}
    </main>
  );
}

interface GuidelistHeaderProps extends Models.Document {
  backdrop_path: string
}

export function WatchlistHeader({ data } : { data?: GuidelistHeaderProps[] }) {

  const randomBackdrop = (object: GuidelistHeaderProps[]) => {
    const itemsWithBackdrop = object.filter((item: any) => item.backdrop_path); 
    
    if (itemsWithBackdrop.length === 0)
      return null;

    const randomIndex = Math.floor(Math.random() * itemsWithBackdrop.length);
    
    return (itemsWithBackdrop[randomIndex].backdrop_path);
  }

  return (
    <div 
      // className='bg-white'
      style={{
        backgroundImage: `${data ? `url('https://image.tmdb.org/t/p/original/${randomBackdrop(data)}` : "url('https://media.giphy.com/media/Ic0IOSkS23UAw/giphy.gif')"}`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: `${data ? 'top' : 'center'}`,
        height: 'clamp(340px,30vh,400px)',
      }}
    >
      <div className="w-full h-full flex flex-col justify-center p-4 items-center bg-gradient-to-t from-background to-[#000000bd] bg-opacity-75">
        <h2 className='text-6xl font-bold text-accent-1'>
          Watchlist
        </h2>
        <p className='text-muted-foreground'>{data?.length ? data.length : '0'} film{data && data?.length > 1 && 's'}</p>
      </div>
    </div>
  )
}