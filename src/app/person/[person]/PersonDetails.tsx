'use client';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { ImageWithFallback } from '@/components/ImageWithFallback';
import { Button } from '../../../components/ui/button';
import Link from 'next/link';
import { useUser } from '@/context/user';
import { MovieAction } from '../../../components/movie/action/MovieAction';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { MovieActionCounter } from '../../../components/count/MovieActionCounter';
import { MovieReview } from '../../movie/[movie]/reviews/assets/MovieReview';
import { PersonFollowButton } from '@/components/button/PersonFollowButton';
import TMP from '@/components/TMP';

export function PersonDetails({ person }: { person: any }) {
  const { user } = useUser();

  return (
    <div className=" w-full">
      <div
        className="bg-white flex items-center justify-center"
        style={{
          backgroundImage: `url('https://image.tmdb.org/t/p/original/${person.profile_path}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          height: 'clamp(340px,30vh,400px)',
        }}
      >
        {user && <PersonFollowButton userId={user?.$id} personId={person.id} />}
      </div>
    </div>
  );
}
