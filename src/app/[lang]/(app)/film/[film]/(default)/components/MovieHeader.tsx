'use client';

import { useState } from 'react';
import Link from 'next/link';
import { MovieActionCounter } from '@/components/Movie/MovieActionCounter';
import { MovieAction } from '@/components/Movie/Actions/MovieAction';
import YoutubeEmbed from '@/components/utils/Youtube';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// ICONS
import { Play, Star } from 'lucide-react';
import { DateOnlyYearTooltip } from '@/components/utils/Date';
import MoviePoster from '@/components/Movie/MoviePoster';
import { HeaderBox } from '@/components/Box/HeaderBox';
import { RuntimeTooltip } from '@/components/utils/RuntimeTooltip';

export default function MovieHeader({
  movie,
}: {
  movie: any;
}) {
  if (!movie) return null;

  return (
    <div>
      <HeaderBox
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/w1280/${movie.backdrop_path})`,
        }}
      >
        <div className="flex flex-col w-full gap-4 items-center @xl:flex-row">
          {/* MOVIE POSTER */}
          <MoviePoster
            className="w-[200px]"
            poster_path={`https://image.tmdb.org/t/p/w500/${movie.data[0].poster_path}`}
            alt={movie.data[0].title ?? ''}
          />
          {/* MOVIE MAIN DATA */}
          <div className="flex flex-col justify-between gap-2 w-full h-full py-4">
            {/* TYPE & GENRES */}
            <div>
              <span className='text-accent-1'>Film</span>
              <span className=" before:content-['_|_']">
                {movie.genres?.map(({ genre } : { genre: any }, index: number) => (
                  <span key={genre.id}>
                    <Button
                      variant="link"
                      className="w-fit p-0 h-full font-normal"
                      asChild
                    >
                      <Link href={`/genre/${genre.id}`}>
                        {genre.data[0].name}
                      </Link>
                    </Button>
                    {index !== movie.genres?.length! - 1 && (
                      <span>, </span>
                    )}
                  </span>
                ))}
              </span>
            </div>
            {/* TITLE */}
            <div>
              <div className="text-clamp space-x-1">
                <span className='font-bold '>{movie.data[0].title}</span>
                {/* DATE */}
                <sup>
                  <DateOnlyYearTooltip date={movie.release_date ?? ''} className='text-sm font-medium text-accent-1'/>
                </sup>
              </div>
              <div className='flex items-center gap-2'>
                <Star size={20} className="text-accent-pink fill-accent-pink" />
                <span className='text-accent-pink font-medium'>{movie.vote_average?.toFixed(1)}</span>
              </div>
              
            </div>
            <div className=" space-y-2">
              <div>
                {movie.directors?.map(({ director } : { director: Database['public']['Tables']['tmdb_person']['Row']}, index: number) => (
                  <>
                    {index > 0 && <span>, </span>}
                    <span key={director.id}>
                      <Button
                        variant="link"
                        className="w-fit p-0 h-full hover:text-accent-1 transition"
                        asChild
                      >
                        <Link href={`/person/${director.id}`}>
                          {director.name}
                        </Link>
                      </Button>
                    </span>
                  </>
                )) ?? <span className="w-fit p-0 h-full font-bold">Unknown</span>}
                {/* RUNTIME */}
                <RuntimeTooltip runtime={movie.runtime ?? 0} className=" before:content-['_•_']" />
              </div>
              <div>
                {/* <MovieActionCounter movieId={movie.id} /> */}
                {movie?.videos?.length > 0 && (
                  <MovieTrailerButton videos={movie.videos} />
                )} 
              </div>
            </div>
          </div>
        </div>
      </HeaderBox>
      <div className="px-4 pb-4">
        <MovieAction filmId={movie.id} all />
      </div>
    </div>
  );
}

export function MovieTrailerButton({ videos }: { videos: Database['public']['Tables']['tmdb_movie_videos']['Row'][] }) {
  const [selectedTrailer, setSelectedTailer] = useState<string>(
    videos[0].key ?? ''
  );

  if (!videos?.length) return null;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={'ghost'} className="w-fit flex gap-2 p-2">
          <Play
            fill="black"
            size="icon"
            className="bg-white rounded-full p-1 w-6"
          />
          Trailer
        </Button>
      </DialogTrigger>
      <DialogContent className="lg:max-w-[60vw]">
        <DialogHeader className="relative flex flex-row gap-4 items-center">
          <div className="absolute w-full flex justify-center -top-16">
            <h2 className="text-accent-1-foreground text-5xl font-bold rounded-md bg-accent-1 px-4 py-2">
              TRAILER
            </h2>
          </div>
          <div className=" pt-4">
            <Select
              onValueChange={setSelectedTailer}
              defaultValue={selectedTrailer}
            >
              <SelectTrigger className="w-fit">
                <SelectValue placeholder="Langue" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {videos?.map((video: any) => (
                    <SelectItem key={video.key} value={video.key}>
                      {video.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </DialogHeader>
        <YoutubeEmbed embedId={selectedTrailer} className="aspect-video" />
      </DialogContent>
    </Dialog>
  );
}
