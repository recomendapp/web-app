'use client';
import Link from 'next/link';
import { useUser } from '@/context/UserProvider';

import { Models } from 'appwrite';
import { useState } from 'react';
import { FileEdit } from 'lucide-react';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../../../../../components/ui/select';
import { useQuery } from 'react-query';
import { getReviewFromUser, getReviews } from '@/api/movie/movie_review';
import MovieReviewOverview from '@/components/modules/MovieReview/MovieReviewOverview';

export function MovieReview({ movie }: { movie: any }) {

  const [ order, setOrder ] = useState("recommended");

  const { data: reviews, isLoading, error } = useQuery(['movie', movie.id, 'reviews', order], () => getReviews(movie.id, order));

  if (error)
    return <div>Error</div>

  if (!reviews)
    return
  console.log('reviews', reviews)
  return (
    <div className="w-full flex flex-col gap-4">
      <div className='flex flex-col gap-4 justify-between lg:flex-row'>
        {/* <MovieUserReview movie={movie} /> */}
        <MyReviewButton movie={movie} />
        <div className='flex flex-1 justify-end gap-2 items-center'>
          Trier par
          <Select onValueChange={setOrder} defaultValue={order}>
            <SelectTrigger className="w-fit">
              <SelectValue  placeholder="Langue" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                  <SelectItem value={"recommended"}>Recommandées</SelectItem>
                  <SelectItem value={"recent"}>Récentes</SelectItem>
                  <SelectItem value={"rating-desc"}>Notes décroissantes</SelectItem>
                  <SelectItem value={"rating-asc"}>Notes croissantes</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      {/* ALL */}
      {reviews.length ? <div className='flex flex-col lg:grid lg:grid-cols-2 gap-4'>
        {reviews.map((review: Models.Document) => (
          <MovieReviewOverview key={review.id} review={review} />
        ))}
      </div>
      :(
        <div className='flex h-full justify-center items-center'>
          <p>Aucune critique</p>
        </div>
      )}
    </div>
  )
}

export function MyReviewButton({ movie } : { movie: any }) {

  const { user } = useUser();

  const {
    data: userReview,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['movie', movie.id, 'review', user?.$id],
    queryFn: () => getReviewFromUser(user?.$id, movie.id),
    enabled: user?.$id !== undefined && user?.$id !== null,
  });


  if (!user || isLoading)
    return

  if (!isLoading && !userReview)
    return (
      <Link href={`/movie/${movie.id}/review/create/`} className="bg-blue-500 rounded-full px-4 py-1 flex gap-2 items-center">
        <FileEdit />
        Écrire une critique
      </Link>
    )

  return (
    <Link href={`/movie/${movie.id}/review/${userReview?.$id}`} className="bg-blue-500 rounded-full px-4 py-1 flex gap-2 items-center">
      <FileEdit />
      Voir ma critique
    </Link>
  )
}