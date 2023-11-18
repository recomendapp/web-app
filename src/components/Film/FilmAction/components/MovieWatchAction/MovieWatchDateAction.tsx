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
import { useAuth } from '@/context/AuthContext/auth-context';

import UPDATE_ACTIVITY_MUTATION from '@/components/Film/FilmAction/mutations/updateMovieActivityMutation'

import { useLocale } from 'next-intl';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { supabase } from '@/lib/supabase/supabase';


interface MovieWatchedDateActionProps extends React.HTMLAttributes<HTMLDivElement> {
    filmId: number;
}

export function MovieWatchDateAction({
  filmId,
}: MovieWatchedDateActionProps) {

  const { user } = useAuth();
  const locale = useLocale();

  const queryClient = useQueryClient();

  const {
    data: activity,
    isLoading: loading,
    isError: error
  } = useQuery({
    queryKey: ['user', user?.id, 'film', filmId, 'activity'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('user_movie_activity')
        .select(`*, review(*)`)
        .eq('film_id', filmId)
        .eq('user_id', user?.id)
        .maybeSingle()
      if (error) throw error;
      return (data)
    },
    enabled: user?.id !== undefined && user?.id !== null,
  });

  const {
    mutateAsync: updateActivityMutation,
  } = useMutation(UPDATE_ACTIVITY_MUTATION, {
    onSuccess: (data, variables) => {
      queryClient.setQueryData(['user', user?.id, 'film', filmId, 'activity'], data)
    }
  })

  if (!activity)
    return (null);

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
                  {activity?.date ? (
                    format(new Date(activity?.date), 'PPP', { locale: fr })
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
          selected={new Date(activity?.date)}
          onSelect={(date) => {
            if (date) {
              user?.id && updateActivityMutation({
                film_id: filmId,
                user_id: user?.id,
                data: {
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