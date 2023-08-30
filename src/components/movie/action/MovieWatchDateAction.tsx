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

interface MovieWatchedDateActionProps
  extends React.HTMLAttributes<HTMLDivElement> {
  userId: string;
  movieId: number;
  date: Date | null;
  handleUpdateDate: (date: Date) => Promise<void>;
}

export function MovieWatchDateAction({
  date,
  handleUpdateDate,
}: MovieWatchedDateActionProps) {
  const [loading, setLoading] = useState(false);
  // const [ date, setDate ] = useState(defaultDate);

  // const handleWatchDateClick = async (event: any) => {
  //     setDate(event)
  //     watchDate(watchId, event)
  //         .then(() => {
  //             // setRecoverServerOffset(!recoverServerOffset)
  //         })
  //         .catch((error) => {
  //             throw error
  //         })
  // }

  if (!date) {
    return <></>;
  }

  return (
    <Popover>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <PopoverTrigger asChild>
              <Button
                disabled={loading}
                variant="accent-1-enabled"
                className={`rounded-full flex gap-4`}
              >
                <CalendarDays className=" h-4 w-4" />
                <div className='hidden sm:block'>
                  {date ? (
                    format(date, 'PPP', { locale: fr })
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
          selected={date}
          onSelect={(e) => {
            if (e) {
              handleUpdateDate(e);
            }
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
