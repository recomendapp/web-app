import { addMinutes } from 'date-fns';

// UI
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useFormatter } from 'next-intl';
import { ConvertHoursMinutes, cn } from '@/lib/utils';

export function RuntimeTooltip({
  runtime,
  className,
}: {
  runtime: number;
  className?: string;
}) {
  const format = useFormatter();

  if (!runtime) return;

  const endTime = addMinutes(new Date(), runtime);

  const formattedEndTime = format.dateTime(endTime, {
    hour: 'numeric',
    minute: '2-digit',
  });

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <span className={cn('w-fit cursor-pointer', className)}>{ConvertHoursMinutes(runtime ?? 0)}</span>
      </TooltipTrigger>
      <TooltipContent align="center" side="bottom">
        {runtime ? `Se termine à ${formattedEndTime}` : 'Unknown'}
      </TooltipContent>
    </Tooltip>
  );
}
