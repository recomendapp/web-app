import { CalendarDays } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { useQuery, useQueryClient } from 'react-query';
import { handleGetWatch, handleUpdateDate } from '@/components/modules/MovieAction/_components/MovieWatchAction/_queries/movie-action-watch';
import { useUser } from '@/context/UserProvider';

interface MovieWatchedDateActionProps
  extends React.HTMLAttributes<HTMLDivElement> {
  movieId: number;
}

export function MovieWatchDateAction({
  movieId
}: MovieWatchedDateActionProps) {

  const { user } = useUser();

  const queryClient = useQueryClient();

  const {
    data: isWatched,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['movie', movieId, 'watch'],
    queryFn: () => handleGetWatch(user.$id, movieId),
    enabled: user?.$id !== undefined && user?.$id !== null,
  });

  if (!isWatched || !isWatched.date || !user) {
    return <></>;
  }

  return (
    <Popover>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <PopoverTrigger asChild>
              <Button
                disabled={isLoading}
                variant="action"
                className={`rounded-full flex gap-4`}
              >
                <CalendarDays />
                <div className='hidden sm:block'>
                  {isWatched.date ? (
                    format(isWatched.date, 'PPP', { locale: fr })
                  ) : (
                    <span>Pick a date</span>
                  )}
                </div>
              </Button>
            </PopoverTrigger>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p>Changer la date de visionnage</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <PopoverContent className="w-auto p-0 flex flex-col justify-center">
        <Calendar
          locale={fr}
          mode="single"
          selected={isWatched.date}
          onSelect={(e) => {
            if (e) {
              handleUpdateDate(e, isWatched, movieId, queryClient);
            }
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}