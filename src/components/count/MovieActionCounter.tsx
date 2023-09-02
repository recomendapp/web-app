import { AlertCircle, Bookmark, Heart, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useEffect, useState } from 'react';
import { Icons } from '../icons';
import { LikeMovieSchema } from '@/schema/like.schema';
import { useQuery, useQueryClient } from 'react-query';
import { useRouter } from 'next/navigation';
import { client, databases } from '@/utils/appwrite';
import { Query } from 'appwrite';
import { MovieDetails } from '../../app/movie/[movie]/MovieDetails';

// const getLike = (userId: string, movieId: number) =>
//     fetch(`/api/user/${userId}/movie/${movieId}/getLike`)
//         .then((res) => res.json())
//         .then(LikeMovieSchema.parse)

export function MovieActionCounter({ movieId }: { movieId: string }) {
  const router = useRouter();

  const [movieLikedCounter, setMovieLikedCounter] = useState<number | null>();
  const [movieWatchedCounter, setMovieWatchedCounter] = useState<
    number | null
  >();
  const [movieRatedCounter, setMovieRatedCounter] = useState<string | null>();
  const [movieWatchlistedCounter, setMovieWatchlistedCounter] = useState<
    string | null
  >();
  const [totalMovieRated, setTotalMovieRated] = useState<number | null>();
  const [movieAverageRating, setMovieAverageRating] = useState<number | null>();

  // INIT VALUE
  useEffect(() => {
    databases
      .listDocuments(
        String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_USERS),
        String(process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_MOVIE),
        [Query.equal('movieId', movieId)]
      )
      .then((movie) => {
        if (movie.total > 0) {
          setMovieLikedCounter(movie.documents[0].likes_count);
          setMovieWatchedCounter(movie.documents[0].watch_count);
          setMovieRatedCounter(movie.documents[0].rating_count);
          setMovieWatchlistedCounter(movie.documents[0].watchlist_count);
          setTotalMovieRated(
            handleTotalMovieRated(movie.documents[0].rating_count)
          );
          setMovieAverageRating(
            handleMovieAverageRating(movie.documents[0].rating_count)
          );
        }
      });
  }, []);

  function handleMovieAverageRating(rating_count: string) {
    const ratingArray = JSON.parse(rating_count);
    let totalVotes = 0;
    let sumOfProducts = 0;

    for (const key in ratingArray) {
      const rating = parseFloat(key);
      const votes = ratingArray[key];

      totalVotes += votes;
      sumOfProducts += rating * votes;
    }

    return totalVotes > 0 ? sumOfProducts / totalVotes : 0;
  }

  function handleTotalMovieRated(rating_count: string) {
    const ratingArray = JSON.parse(rating_count);
    return Number(
      Object.values(ratingArray).reduce(
        (accumulator: any, currentValue: any) => accumulator + currentValue,
        0
      )
    );
  }

  useEffect(() => {
    movieRatedCounter &&
      setTotalMovieRated(handleTotalMovieRated(movieRatedCounter));
    movieRatedCounter &&
      setMovieAverageRating(handleMovieAverageRating(movieRatedCounter));
  }, [movieRatedCounter]);

  // useEffect(() => {
  //     movieId && client.subscribe(
  //         `databases.${process.env.NEXT_PUBLIC_APPWRITE_DATABASE_USERS}.collections.${process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_MOVIE}.documents.${movieId}`,
  //         (response: { payload: any }) => {
  //             setMovieLikedCounter(response.payload.likes_count)
  //             setMovieWatchedCounter(response.payload.watch_count)
  //             setMovieRatedCounter(response.payload.rating_count)
  //             setMovieWatchlistedCounter(response.payload.watchlist_count)

  //         }
  //     )
  // }, [])

  return (
    <div className='bg-muted px-4 py-1 rounded-full flex items-center gap-2'>
      <span className='flex items-center gap-1'>
        <Star className='inline' fill='white' size={20}/>
        {totalMovieRated ? totalMovieRated : 0}
      </span>
      <span className='flex items-center gap-1'>
        <Heart className='inline' fill='white' size={20}/>
        {movieLikedCounter ? movieLikedCounter : 0}
      </span>
      <span className='flex items-center gap-1'>
        <Bookmark className='inline' fill='white' size={20}/>
        {movieWatchlistedCounter ? movieWatchlistedCounter : 0}
      </span>
      Rating: {movieAverageRating}
      {/* Likes: {movieLikedCounter}
      Watch: {movieWatchedCounter}
      Watchlist: {movieWatchlistedCounter} */}
    </div>
  );
}
