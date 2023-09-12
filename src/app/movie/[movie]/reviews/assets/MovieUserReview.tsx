'use client';

import { Button } from '../../../../../components/ui/button';
import Link from 'next/link';
import { useUser } from '@/context/user';
import { MovieAction } from '../../../../../components/movie/action/MovieAction/MovieAction';
import { FileEdit } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../../../../../components/ui/avatar';
import { getInitiales } from '@/lib/utils/utils';
import { BsFillPatchCheckFill } from 'react-icons/bs';
import { Textarea } from '../../../../../components/ui/textarea';
import { Input } from '../../../../../components/ui/input';
import { useQuery } from 'react-query';
import { getReviewFromUser } from '@/api/movie/movie_review';

export function MovieUserReview({ movie }: { movie: any }) {
  const { user } = useUser();
  const offset = 0;

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
      <CreateReview movie={movie} user={user} />
    )

  return (
    <Link href={`/movie/${movie.id}/review/${userReview.$id}`} className="bg-blue-500 rounded-full px-4 py-1 flex gap-2 items-center">
      <FileEdit />
      Voir ma critique
    </Link>
  )
}

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { CreateReviewForm } from './CreateReviewForm';

export function CreateReview({ movie, user } : { movie: any, user: any }) {

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className='gap-2'>
          <FileEdit />
          Écrire une critique
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-5xl bg-black">
        <DialogHeader>
          <DialogTitle className='text-center'>Nouvelle critique</DialogTitle>
        </DialogHeader>
        <CreateReviewForm user={user} movieId={movie.id} />
      </DialogContent>
    </Dialog>
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
