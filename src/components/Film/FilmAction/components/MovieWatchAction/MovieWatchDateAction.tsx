import { CalendarDays } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { useAuth } from '@/context/AuthContext/AuthProvider';

import UPDATE_FILM_WATCH_MUTATION from '@/components/Film/FilmAction/components/MovieWatchAction/mutations/updateFilmActionMutationOLD';
import { ApolloError, useMutation } from '@apollo/client';
import { FilmAction } from '@/types/type.film';
import { useLocale } from 'next-intl';


interface MovieWatchedDateActionProps extends React.HTMLAttributes<HTMLDivElement> {
    filmId: string;
    filmAction: FilmAction;
    loading: boolean;
    error: ApolloError | undefined;
}

export function MovieWatchDateAction({
  filmId,
  filmAction,
  loading,
  error,
}: MovieWatchedDateActionProps) {

  const { user } = useAuth();
  const locale = useLocale();

  const [ updateFilmWatchMutation ] = useMutation(UPDATE_FILM_WATCH_MUTATION);

  if (!filmAction?.watch.edges.length || !user) {
    return null;
  }

  return (
    <Popover>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <PopoverTrigger asChild>
              <Button
                disabled={loading}
                variant="action"
                className={`rounded-full flex gap-4`}
              >
                <CalendarDays />
                <div className='hidden sm:block'>
                  {filmAction.watch?.edges?.length ? (
                    format(new Date(filmAction.watch.edges[0].watch.date), 'PPP', { locale: fr })
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
          selected={new Date(filmAction?.watch?.edges[0]?.watch?.date)}
          onSelect={(date) => {
            if (date) {
              updateFilmWatchMutation({
                variables: {
                  film_id: filmId,
                  user_id: user?.id,
                  date: date
                }
              });
            }
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}