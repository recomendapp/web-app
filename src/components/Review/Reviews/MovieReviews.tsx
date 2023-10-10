'use client';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext/AuthProvider';

import { Models } from 'appwrite';
import { useState } from 'react';
import { FileEdit } from 'lucide-react';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import MovieReviewOverview from '@/components/Review/MovieReviewOverview';
import { useQuery } from '@apollo/client';

import { Review } from '@/types/type.review';

import REVIEWS_QUERY from '@/components/Review/queries/reviewsQuery'
import USER_REVIEW_QUERY from '@/components/Review/queries/userReviewQuery'

export function MovieReview({ filmId }: { filmId: string }) {

  const [ order, setOrder ] = useState("recent");

  const numberOfResult = 8;

  const { data: reviewsQuery, loading, error, fetchMore, networkStatus } = useQuery(REVIEWS_QUERY, {
    variables: {
      film_id: filmId,
      order: order === 'recommended' ? {"likes_count": "DescNullsLast"}
        : order === 'recent ' ? { "updated_at": "DescNullsFirst"}
        : { "updated_at": "DescNullsFirst"},
      first: numberOfResult,
    },
    skip: !filmId
  })
  const reviews: [ { review: Review }] = reviewsQuery?.reviewCollection?.edges;
  const pageInfo: { hasNextPage: boolean, endCursor: string,} = reviewsQuery?.reviewCollection?.pageInfo;


  if (error)
    return <div>Error</div>

  if (!reviews)
    return

  return (
    <div className="w-full h-full flex flex-col gap-4">
      <div className='flex flex-col gap-4 justify-between lg:flex-row'>
        {/* <MovieUserReview movie={movie} /> */}
        <MyReviewButton filmId={filmId} />
        <div className='flex flex-1 justify-end gap-2 items-center'>
          Trier par
          <Select onValueChange={setOrder} defaultValue={order}>
            <SelectTrigger className="w-fit">
              <SelectValue  placeholder="Langue" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                  <SelectItem value={"recent"}>Récentes</SelectItem>
                  <SelectItem value={"recommended"}>Recommandées</SelectItem>
                  <SelectItem value={"rating-desc"}>Notes décroissantes</SelectItem>
                  <SelectItem value={"rating-asc"}>Notes croissantes</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      {/* ALL */}
      {reviews.length ? <div className='flex flex-col gap-4'>
        {reviews.map(({ review } : { review: Review}) => (
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

export function MyReviewButton({ filmId } : { filmId: string }) {

  const { user } = useAuth();

  const { data: userReviewQuery, loading, error} = useQuery(USER_REVIEW_QUERY, {
    variables: {
      film_id: filmId,
      user_id: user?.id
    },
    skip: !user?.id
  })
  const userReview = userReviewQuery?.reviewCollection?.edges[0]?.review;
  console.log('userReview', userReview)


  if (!user || loading)
    return

  if (!loading && !userReview)
    return (
      <Link href={`/film/${filmId}/review/create/`} className="bg-blue-500 rounded-full px-4 py-1 flex gap-2 items-center">
        <FileEdit />
        Écrire une critique
      </Link>
    )

  return (
    <Link href={`/@${userReview?.user.username}/film/${filmId}`} className="bg-blue-500 rounded-full px-4 py-1 flex gap-2 items-center">
      <FileEdit />
      Voir ma critique
    </Link>
  )
}