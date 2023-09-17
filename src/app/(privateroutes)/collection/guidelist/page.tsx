'use client';
import { useUser } from '@/context/UserProvider';
import { Models } from 'appwrite/types/models';

// UI
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { AspectRatio } from '@/components/ui/aspect-ratio';
import { ImageWithFallback } from '@/components/elements/Tools/ImageWithFallback';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Clock, Trash2 } from 'lucide-react';
import UserCard from '@/components/elements/UserCard/UserCard';
import { DateOnlyYearTooltip } from '@/components/elements/Date/Date';
import { ConvertHoursMinutes } from '@/lib/utils/utils';
import { TableGuidelist } from '@/components/modules/MovieGuidelist/table/TableGuidelist';
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
      <div className='p-4'>
        {guidelist && <TableGuidelist data={guidelist} />}
      </div>
    </main>
  );
}


const GuidelistHeader = ({ data } : { data?: any[] }) => {

  const randomBackdrop = (object: any[]) => {
    const itemsWithBackdrop = object.filter((item: any) => item.backdrop_path); 
    
    if (itemsWithBackdrop.length === 0)
      return null;

    const randomIndex = Math.floor(Math.random() * itemsWithBackdrop.length);
    
    return (itemsWithBackdrop[randomIndex].backdrop_path);
  }

  return (
    <div
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