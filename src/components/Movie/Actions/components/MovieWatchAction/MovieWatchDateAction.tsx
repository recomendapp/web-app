import { CalendarDays } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { format } from 'date-fns';
import { fr, enUS } from 'date-fns/locale';
import { useAuth } from '@/context/auth-context';

import { useLocale } from 'next-intl';
import toast from 'react-hot-toast';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase/client';

interface MovieWatchedDateActionProps
  extends React.HTMLAttributes<HTMLDivElement> {
  movieId: number;
}

export function MovieWatchDateAction({ movieId }: MovieWatchedDateActionProps) {
  const { user } = useAuth();

  const locale = useLocale();

  const queryClient = useQueryClient();

  const {
    data: activity,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['user', user?.id, 'activity', { movieId }],
    queryFn: async () => {
      if (!user?.id || !movieId) throw Error('Missing profile id or locale or movie id');
      const { data, error } = await supabase
        .from('user_movie_activity')
        .select(`*, review:user_movie_review(*)`)
        .eq('user_id', user.id)
        .eq('movie_id', movieId)
        .maybeSingle()
      if (error) throw error;
      return data;
    },
    enabled: !!user?.id && !!movieId,
  });

  const { mutateAsync: updateDate } = useMutation({
    mutationFn: async (date: Date) => {
      if (!activity?.id) throw Error('Missing activity id');
      const {data, error } = await supabase
        .from('user_movie_activity')
        .update({
          date: date.toISOString(),
        })
        .eq('id', activity?.id)
        .select(`*, review:user_movie_review(*)`)
        .single()
      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['user', user?.id, 'activity', { movieId }], data)
    },
    onError: () => {
      toast.error('Une erreur s\'est produite');
    },
  });

  if (!activity) return null;

  return (
    <Popover>
      <Tooltip>
        <TooltipTrigger asChild>
          <PopoverTrigger asChild>
            <Button
              disabled={isLoading || isError}
              variant="action"
              className={`rounded-full flex gap-4`}
            >
              <CalendarDays />
              <div className="hidden sm:block">
                {activity?.date ? (
                  format(new Date(activity?.date), 'PPP', {
                    locale: locale == 'fr' ? fr : enUS,
                  })
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
      <PopoverContent className="w-auto p-0 flex flex-col justify-center">
        <Calendar
          locale={locale == 'fr' ? fr : enUS}
          mode="single"
          selected={new Date(activity?.date)}
          onSelect={async (date) => date && await updateDate(date)}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
