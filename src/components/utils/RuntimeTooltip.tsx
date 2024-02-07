import { addMinutes, format } from 'date-fns';

// UI
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useLocale } from 'next-intl';
import { enUS, fr } from 'date-fns/locale';
import { ConvertHoursMinutes, cn } from '@/lib/utils';

export function RuntimeTooltip({
  runtime,
  className,
}: {
  runtime: number;
  className?: string;
}) {
  const locale = useLocale();

  if (!runtime) return;

  const endTime = addMinutes(new Date(), runtime);

  const formattedEndTime = format(endTime, 'HH:mm', {
    locale: locale === 'en' ? enUS : fr,
  });

  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger asChild>
          <span className={cn('w-fit', className)}>{ConvertHoursMinutes(runtime ?? 0)}</span>
        </TooltipTrigger>
        <TooltipContent align="center" side="bottom">
          {runtime ? `Se termine à ${formattedEndTime}` : 'Unknown'}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
