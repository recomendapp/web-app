import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

// UI
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger
} from "@/components/ui/tooltip";

export function DateOnlyYearTooltip({ date, inline } : { date:string, inline?: boolean }) {
    if (!date)
        return
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    {inline ? 
                        <span 
                        className="before:content-['_•_']"
                        >
                            {date.split('-')[0]}
                        </span>
                    :
                        <p className='w-fit'>
                            {date.split('-')[0]}
                        </p>
                    }
                </TooltipTrigger>
                <TooltipContent align='center' side="bottom">
                {date
                    ? format(new Date(date), 'PPP', {
                        locale: fr,
                    })
                    : 'Unknown'}
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}