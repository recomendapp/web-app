'use client';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { ImageWithFallback } from '@/components/ImageWithFallback';
import { Button } from '../../../../../components/ui/button';
import Link from 'next/link';
import { useUser } from '@/context/user';
import { MovieAction } from '../../../../../components/movie/action/MovieAction';

import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { databases } from '@/utils/appwrite';
import { Query } from 'appwrite';
import { useEffect, useState } from 'react';
import { BarChart3, FileEdit, Heart, MessageSquare, Pencil, Repeat2, Share } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../../../../../components/ui/avatar';
import { getInitiales } from '@/lib/utils';
import { BsFillPatchCheckFill } from 'react-icons/bs';
import { Textarea } from '../../../../../components/ui/textarea';
import { Input } from '../../../../../components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../../../../../components/ui/select';
import { MovieUserReview } from './MovieUserReview';
import { useQuery } from 'react-query';

export function MovieReview({ movie }: { movie: any }) {
  const { user } = useUser();
  const offset = 0;

  // const [ reviews, setReviews ] = useState<any>()
  const [ order, setOrder ] = useState("recommended");

  // useEffect(() => {
  //   getReviews();
  // }, [movie, order])

  const { data: reviews, isLoading, error } = useQuery(['movie', movie.id, 'reviews', order], () => getReviews());

  const getReviews = async () => {
    const payload = [
      Query.equal("movieId", movie.id),
      Query.limit(10),
      Query.offset(offset)
    ]
    switch (order) {
      case "recommended":
        payload.push(Query.orderDesc("views_count"));
        break;
      case "recent":
        payload.push(Query.orderDesc("$updatedAt"));
        break;
      case "rating-desc":
        payload.push(Query.orderDesc("movie_rating"));
        break;
      case "rating-asc":
        payload.push(Query.orderAsc("movie_rating"));
        break;
    }
    const { documents } = await databases.listDocuments(
      String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_USERS),
      String(process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_MOVIE_REVIEW),
      payload
    );

    return (documents)
  };

  if (error)
    return <div>Error</div>

  if (!reviews)
    return <div>Loading</div>

  return (
    <div className="w-full flex flex-col gap-4">
      <div className='flex justify-between'>
        <MovieUserReview movie={movie} />
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
      <div className='grid grid-cols-3 gap-4'>
        {reviews && reviews.map((review: any) => (
          <MovieReviewItem key={movie.id} movieId={movie.id} review={review} user={user} />
        ))}
      </div>
    </div>
  )
}

export function MovieReviewEdit({ movieId, review, user } : { movieId: number, review: any | undefined, user: any} ) {
  
  
  return (
    <div className='w-full bg-accent-1-foreground p-4 rounded-md flex flex-col gap-4'>
        {/* USER */}
        <Link href={'/@' + user.username} className='flex gap-2 w-fit'>
          <Avatar className="w-[50px] h-[50px]">
            <AvatarImage src={user.avatar} alt={user.username} />
            <AvatarFallback className="text-[25px]">
              {getInitiales(user)}
            </AvatarFallback>
          </Avatar>
          <div className="flex justify-center items-center gap-1">
            <span className='hover:underline'>
              {user.username}
            </span>
            {user.verify && <BsFillPatchCheckFill fill="#1D9BF0" size={16} />}
            <span className=' text-muted-foreground'>
              @{user.username}
            </span>
          </div>
        </Link>
        {/* REVIEW */}
        <div className='flex flex-col gap-4'>
          {/* TITLE */}
          <Input placeholder='Titre (optionnel)'/>
          {/* BODY */}
          
          <Textarea />
        </div>
        <div className='text-right'>
          <Button>Envoyer</Button>
        </div>
      </div>
  )
}

export function MovieReviewItem({ movieId, review, user }: { movieId: number, review: any, user: any}) {
  console.log('review', review)
  return (
    <Link key={movieId} href={`/movie/${movieId}/review/${review.$id}`} className='h-fit w-full bg-accent-1-foreground p-4 rounded-md flex flex-col gap-4'>
      {/* USER */}
      <div  className='flex gap-2 justify-between'>
          <Link href={'/@' + review.user.username} className='flex gap-2 w-fit '>
            <Avatar className="w-[50px] h-[50px]">
              <AvatarImage src={review.user.avatar} alt={review.user.username} />
              <AvatarFallback className="text-[25px]">
                {getInitiales(review.user)}
              </AvatarFallback>
            </Avatar>
            <div className="flex justify-center items-center gap-1">
              <span className='hover:underline'>
                {review.user.username}
              </span>
              {review.user.verify && <BsFillPatchCheckFill fill="#1D9BF0" size={16} />}
              <span className=' text-muted-foreground'>
                @{review.user.username}
              </span>
            </div>
          </Link>
        {/* EXTRA DATA */}
        <div className='flex items-center  gap-2'>
          {review.movie_rating && 
            <div className='border p-1'>
              {review.movie_rating}
            </div>
          }
          {review.movie_liked && 
            <div>
              <Heart fill='white' />
            </div>
          }
        </div>
        {/* EDIT BUTTON */}
        {/* {user && (review.user.$id == user.$id) && <Button onClick={(e) => {
          e.preventDefault();
          // setIsEdit(true)
        }} variant={"ghost"}><Pencil size={"icon"} /></Button>} */}
      </div>
      {/* REVIEW */}
      <div className='flex flex-col gap-4'>
        {/* TITLE */}
        {review.title && <div className='text-xl font-semibold'>
          {review.title}
        </div>}
        {/* BODY */}
        <div className=' text-justify'>
          {review.body}
        </div>
      </div>
      {/* COUNTER */}
      <div className='px-4 py-1 flex items-center justify-between gap-2'>
        {/* <span className='flex items-center gap-1'>
          <MessageSquare className='inline' fill='white' size={20}/>
          {review.comments_count ? review.comments_count : 0}
        </span> */}
        {/* <span className='flex items-center gap-1'>
          <Repeat2 className='inline' size={20}/>
          {review.comments_count ? review.comments_count : 0}
        </span> */}
        <span className='flex items-center gap-1'>
          <Heart className='inline' fill='white' size={20}/>
          {review.likes_count ? review.likes_count : 0}
        </span>
        <span className='flex items-center gap-1'>
          <BarChart3 className='inline' size={20}/>
          {review.views_count ? review.views_count : 0}
        </span>
        <span className='flex items-center gap-1'>
          <Share className='inline' size={20}/>
        </span>
      </div>
    </Link>
  )
}