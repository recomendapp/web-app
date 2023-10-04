'use client';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { ImageWithFallback } from '@/components/tools/ImageWithFallback';
import { Button } from '../../../components/ui/button';
import Link from 'next/link';
import { MovieAction } from '../../../components/Film/FilmAction/MovieAction';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { MovieActionCounter } from '../../../components/Film/MovieActionCounter';
import { PersonFollowButton } from '@/components/Person/ButtonFollowPerson/PersonFollowButton';
import { useAuth } from '@/context/AuthContext/AuthProvider';

export function PersonDetails({ person }: { person: any }) {
  const { user } = useAuth();

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
        {user && <PersonFollowButton userId={user?.id} personId={person.id} />}
      </div>
    </div>
  );
}
