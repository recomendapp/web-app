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
import { fr, enUS } from 'date-fns/locale';
import { useAuth } from '@/context/auth-context';

// import UPDATE_ACTIVITY_MUTATION from '@/components/Movie/Actions/mutations/updateMovieActivityMutation';

import { useLocale } from 'next-intl';

// GRAPHQL
import { useQuery, useMutation } from '@apollo/client';
import GET_USER_MOVIE_ACTIVITY_BY_MOVIE_ID from '@/graphql/User/Movie/Activity/queries/GetUserMovieActivityByMovieId';
import UPDATE_ACTIVITY_MUTATION from '@/graphql/User/Movie/Activity/mutations/UpdateUserMovieActivity';
import type {
  UpdateUserMovieActivityMutation,
  GetUserMovieActivityByMovieIdQuery,
} from '@/graphql/__generated__/graphql';
import toast from 'react-hot-toast';

interface MovieWatchedDateActionProps
  extends React.HTMLAttributes<HTMLDivElement> {
  movieId: string;
}

export function MovieWatchDateAction({ movieId }: MovieWatchedDateActionProps) {
  const { user } = useAuth();
  const locale = useLocale();

  const {
    data: activityQuery,
    loading,
    error,
  } = useQuery<GetUserMovieActivityByMovieIdQuery>(GET_USER_MOVIE_ACTIVITY_BY_MOVIE_ID, {
    variables: {
      movie_id: movieId,
      user_id: user?.id,
    },
    skip: !user || !movieId,
  });
  const activity = activityQuery?.user_movie_activityCollection?.edges[0]?.node;

  const [updateActivityMutation] = useMutation<UpdateUserMovieActivityMutation>(
    UPDATE_ACTIVITY_MUTATION,
    {
      update: (cache, { data }) => {
        cache.writeQuery({
          query: GET_USER_MOVIE_ACTIVITY_BY_MOVIE_ID,
          variables: {
            movie_id: movieId,
            user_id: user?.id,
          },
          data: {
            user_movie_activityCollection: {
              edges: [
                {
                  node: data?.updateuser_movie_activityCollection?.records[0],
                },
              ],
            },
          },
        });
      },
    }
  );

  const handleUpdate = async (date: Date) => {
    try {
      if (!user || !movieId || !activity?.id) throw Error("User or movieId doesn't exist");
      await updateActivityMutation({
        variables: {
          id: activity.id,
          movie_id: movieId,
          user_id: user.id,
          date: date,
        },
      });
    } catch (errors) {
      toast.error("Une erreur s'est produite");
    }
  };

  if (!activity) return null;

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
      </TooltipProvider>
      <PopoverContent className="w-auto p-0 flex flex-col justify-center">
        <Calendar
          locale={fr}
          mode="single"
          selected={new Date(activity?.date)}
          onSelect={(date) => date && handleUpdate(date)}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
