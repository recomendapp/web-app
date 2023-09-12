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

import { AspectRatio } from '@/components/ui/aspect-ratio';
import { ImageWithFallback } from '@/components/ImageWithFallback';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Clock, Trash, Trash2 } from 'lucide-react';
import UserCard from '@/components/card/UserCard';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { DateOnlyYearTooltip } from '@/components/utils/date/Date';
import { ConvertHoursMinutes } from '@/lib/utils/utils';
import { TableGuidelist } from '@/components/table/guidelist/TableGuidelist';
import { useQuery } from 'react-query';
import { handleGetGuidelist } from '@/api/movie/movie_guidelist';

export default function Guidelist() {

  const { user } = useUser();

  const {
    data: guidelist,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['collection', 'guidelist'],
    queryFn: () => handleGetGuidelist(user),
    enabled: user?.$id !== undefined && user?.$id !== null,
  });

  return (
    <main className="h-full">
      <GuidelistHeader data={guidelist} />
      {/* <TestTable guidelist={guidelist} /> */}
      {/* <TableGuidelist /> */}
      <div className='p-4'>
        {guidelist && <TableGuidelist data={guidelist} />}
      </div>
      {/* <TableGuidelist /> */}
    </main>
  );
}

interface GuidelistHeaderProps extends Models.Document {
  backdrop_path: string
}

export function GuidelistHeader({ data } : { data?: GuidelistHeaderProps[] }) {

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
          GUIDELIST
        </h2>
        <p className='text-muted-foreground'>{data?.length ? data.length : '0'} film{data && data?.length > 1 && 's'}</p>
      </div>
    </div>
  )
}


export function TestTable({ guidelist } : { guidelist: Models.Document}) {
  return (
    <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Film</TableHead>
            <TableHead>Date</TableHead>
            <TableHead><Clock /></TableHead>
            <TableHead>Commentaire</TableHead>
            <TableHead>Ajouté par</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {guidelist &&
            guidelist.map((movie: any) => (
              <TableRow key={movie.id} className='border-none'>
                <Link href={'/movie/' + movie.id}>
                  <TableCell className="p-4 flex items-center gap-4">
                    <div className="w-[90px]">
                      <AspectRatio ratio={2 / 3}>
                        <ImageWithFallback
                          src={
                            'https://image.tmdb.org/t/p/w500/' +
                            movie.poster_path
                          }
                          alt={movie.title}
                          fill
                          className="rounded-md object-cover"
                        />
                      </AspectRatio>
                    </div>
                    {/* MOVIE DATA */}
                    <div className="w-fit p-0 h-full text-base">
                      <div>
                        {movie.title}
                      </div>
                      <div>
                      {movie.directors.length ? (
                        movie.directors.map((director: any, index: number) => (
                          <span key={director.id}>
                            <Button
                              variant="link"
                              className="w-fit p-0 h-full text-accent-1 font-normal italic"
                              asChild
                            >
                              <Link href={`/person/${director.id}`}>
                                {director.name}
                              </Link>
                            </Button>
                            {index !== movie.directors.length - 1 && (
                              <span>, </span>
                            )}
                          </span>
                        ))
                      ) : (
                        <span className="w-fit p-0 h-full text-accent-1 font-normal italic">
                          Unknown
                        </span>
                      )}
                      </div>
                      
                    </div>
                  </TableCell>
                </Link>
                <TableCell>
                  <DateOnlyYearTooltip date={movie.release_date} />
                </TableCell>
                <TableCell>
                  {ConvertHoursMinutes(movie.runtime)}
                </TableCell>
                <TableCell className='w-[400px] text-justify italic'>{movie.comment}</TableCell>
                <TableCell>
                  <UserCard user={movie.by}/>
                </TableCell>
                <TableCell
                  // onClick={() => handleDeleteGuidelistedMovie(movie.$id)}
                >
                  <Trash2 />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
  )
}