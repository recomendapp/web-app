import { CalendarDays, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useEffect, useState } from "react";
import { Icons } from "../../icons";
import { useIsMovieWatched, useWatchMovie, watchDate } from "@/hooks/action/movie/watch";
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { format } from "date-fns"
import { fr } from "date-fns/locale";


export function MovieWatchDateAction ({defaultDate, watchId, movieId, userId} : {defaultDate: Date, watchId: string, movieId: number, userId: string}) {
    const [ loading, setLoading ] = useState(false)
    // const [ date, setDate ] = useState(defaultDate);
    const [ date, setDate ] = useState<Date | undefined>(new Date(defaultDate));

    const handleWatchDateClick = async (event: any) => {
        setDate(event)
        watchDate(watchId, event)
            .then(() => {
                // setRecoverServerOffset(!recoverServerOffset)
            })
            .catch((error) => {
                throw error
            })
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
                                className={`rounded-full`}
                            >
                                <CalendarDays className="mr-2 h-4 w-4" />
                                {date ? format(date, "PPP", { locale: fr }) : <span>Pick a date</span>}
                            </Button>
                        </PopoverTrigger>
                    </TooltipTrigger>
                    <TooltipContent side='bottom'>
                        <p>Changer la date de visionnage</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
            <PopoverContent className="w-auto p-0 flex flex-col justify-center">
                <Calendar
                    locale={fr}
                    mode="single"
                    selected={date}
                    onSelect={handleWatchDateClick}
                    initialFocus
                    
                />
            </PopoverContent>
        </Popover>
    )
}