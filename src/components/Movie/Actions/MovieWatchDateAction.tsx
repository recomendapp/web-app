import { CalendarDays } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { fr, enUS } from 'date-fns/locale';
import { useAuth } from '@/context/auth-context';


import { useFormatter, useLocale } from 'next-intl';
import toast from 'react-hot-toast';
import { TooltipBox } from '@/components/Box/TooltipBox';
import { useUserMovieActivity } from '@/features/user/userQueries';
import { useUserMovieActivityUpdate } from '@/features/user/userMutations';

interface MovieWatchedDateActionProps
  extends React.HTMLAttributes<HTMLDivElement> {
  movieId: number;
}

export function MovieWatchDateAction({ movieId }: MovieWatchedDateActionProps) {
  const { user } = useAuth();
  const locale = useLocale();
  const format = useFormatter();

  const {
      data: activity,
      isLoading,
      isError,
    } = useUserMovieActivity({
      userId: user?.id,
      movieId: movieId,
    });
  const updateDate = useUserMovieActivityUpdate();

  const handleUpdateDate = async (date: Date) => {
    if (!activity) return;
    await updateDate.mutateAsync({
      activityId: activity.id,
      date: date,
    }), {
      onError: () => {
        toast.error('Une erreur s\'est produite');
      }
    };
  };

  if (!activity) return null;

  return (
    <Popover>
      <TooltipBox tooltip={'Changer la date de visionnage'}>
        <PopoverTrigger asChild>
          <Button
            disabled={isLoading || isError}
            variant="action"
            className={`rounded-full flex gap-4`}
          >
            <CalendarDays />
            <div className="hidden sm:block">
              {activity?.date ? (
                format.dateTime(new Date(activity?.date), {
                  month: 'long',
                  year: 'numeric',
                  day: 'numeric',
                })
              ) : (
                <span>Pick a date</span>
              )}
            </div>
          </Button>
        </PopoverTrigger>
      </TooltipBox>
      <PopoverContent className="w-auto p-0 flex flex-col justify-center">
        <Calendar
          locale={locale == 'fr' ? fr : enUS}
          mode="single"
          selected={new Date(activity?.date)}
          onSelect={async (date) => date && await handleUpdateDate(date)}
          initialFocus
          captionLayout="dropdown-buttons"
          fromDate={new Date('1900-01-01')}
          toDate={new Date()}
        />
      </PopoverContent>
    </Popover>
  );
}
