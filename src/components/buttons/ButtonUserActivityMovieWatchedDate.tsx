import * as React from "react"
import { Button } from "@/components/ui/button";
import { useUserActivityMovieQuery } from "@/features/client/user/userQueries";
import { useAuth } from "@/context/auth-context";
import { TooltipBox } from "@/components/Box/TooltipBox";
import { cn } from "@/lib/utils";
import { CalendarDaysIcon } from "lucide-react";
import { useUserActivityMovieUpdateMutation } from "@/features/client/user/userMutations";
import toast from "react-hot-toast";
import { useFormatter, useLocale, useTranslations } from "next-intl";
import { upperFirst } from "lodash";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { fr, enUS } from 'date-fns/locale';

interface ButtonUserActivityMovieWatchedDateProps
	extends React.ComponentProps<typeof Button> {
		movieId: number;
    	stopPropagation?: boolean;
	}

const ButtonUserActivityMovieWatchedDate = React.forwardRef<
	React.ComponentRef<typeof Button>,
	ButtonUserActivityMovieWatchedDateProps
>(({ movieId, stopPropagation = true, className, ...props }, ref) => {
	const { session } = useAuth();
	const locale = useLocale();
	const format = useFormatter();
	const t = useTranslations();
	const {
		data: activity,
		isLoading,
		isError,
	} = useUserActivityMovieQuery({
		userId: session?.user.id,
		movieId: movieId,
	});
	const updateDate = useUserActivityMovieUpdateMutation();

	const handleUpdateDate = async (date: Date) => {
		if (!activity) return;
		await updateDate.mutateAsync({
		activityId: activity.id,
		watchedDate: date,
		}), {
			onError: () => {
				toast.error(upperFirst(t('common.messages.an_error_occurred')));
			}
		};
	};

	if (!activity) return null;

	return (
	<Popover>
      <TooltipBox tooltip={'Changer la date de visionnage'}>
        <PopoverTrigger asChild>
          <Button
            disabled={isLoading || isError || activity === undefined || updateDate.isPending}
            variant="action"
            className={cn('rounded-full flex gap-4', className)}
            {...props}
          >
            <CalendarDaysIcon />
            <div className="hidden sm:block">
              {activity.watched_date ? (
                format.dateTime(new Date(activity.watched_date), {
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
          selected={new Date(activity.watched_date ?? '')}
          onSelect={async (date) => date && await handleUpdateDate(date)}
          className="rounded-md border"
          startMonth={new Date('1900-01-01')}
          endMonth={new Date()}
          hidden={[{ before: new Date('1900-01-01')}]}
        />
      </PopoverContent>
    </Popover>
	);
});
ButtonUserActivityMovieWatchedDate.displayName = 'ButtonUserActivityMovieWatchedDate';

export default ButtonUserActivityMovieWatchedDate;
