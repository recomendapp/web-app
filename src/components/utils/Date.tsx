import { format } from 'date-fns';

// UI
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useLocale } from 'next-intl';
import { enUS, fr } from 'date-fns/locale';
import { cn } from '@/lib/utils';

export function DateOnlyYearTooltip({
  date,
  className,
}: {
  date: string | null | undefined;
  className?: string;
}) {
  const locale = useLocale();
  if (!date) return;
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <span className={cn('w-fit', className)}>{date.split('-')[0]}</span>
      </TooltipTrigger>
      <TooltipContent align="center" side="bottom">
        {date
          ? format(new Date(date), 'PPP', {
              locale: locale === 'fr' ? fr : enUS,
            })
          : 'Unknown'}
      </TooltipContent>
    </Tooltip>
  );
}
