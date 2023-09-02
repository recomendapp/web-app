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
import { FileEdit } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../../../../../components/ui/avatar';
import { getInitiales } from '@/lib/utils';
import { BsFillPatchCheckFill } from 'react-icons/bs';
import { Textarea } from '../../../../../components/ui/textarea';
import { Input } from '../../../../../components/ui/input';

export function MovieUserReview({ movie }: { movie: any }) {
  const { user } = useUser();
  const offset = 0;

  const [ isLoading, setIsLoading ] = useState(true);
  const [ userReview, setUserReview ] = useState<any>()
  const [ isEdit, setIsEdit ] = useState(false);
  const [ order, setOrder ] = useState("recommended");

  useEffect(() => {
    user && getUserReview();
  }, [movie, user, order])

  const getUserReview = async () => {
    const { documents } = await databases.listDocuments(
      String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_USERS),
      String(process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_MOVIE_REVIEW),
      [
        Query.equal("movieId", movie.id),
        Query.equal("userId", user.$id),
      ]
    );
    setUserReview(documents[0]);
    setIsLoading(false);
  };

  console.log('userReview', userReview)
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
import { ScrollArea } from '@/components/ui/scroll-area';
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
      <DialogContent className="max-w-5xl">
        <DialogHeader>
          <DialogTitle className='text-center'>Nouvelle critique</DialogTitle>
        </DialogHeader>
        <MovieAction movieId={movie.id} userId={user.$id} />
        <CreateReviewForm user={user} movieId={movie.id} />
        {/* <div className='w-full bg-accent-1-foreground p-4 rounded-md flex flex-col gap-4'>
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
          <div className='flex flex-col gap-4'>
            <Input placeholder='Titre (optionnel)' className='bg-accent-1-foreground'/>
            <Textarea />
          </div>
          <div className='text-right'>
            <Button>Envoyer</Button>
          </div>
        </div> */}
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
