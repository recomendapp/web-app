// UI
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useFormatter, useLocale } from 'next-intl';
import { cn } from '@/lib/utils';

export function DateOnlyYearTooltip({
  date,
  className,
}: {
  date: string | null | undefined;
  className?: string;
}) {
  const format = useFormatter();
  if (!date) return;
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <span className={cn('w-fit cursor-pointer', className)}>{date.split('-')[0]}</span>
      </TooltipTrigger>
      <TooltipContent align="center" side="bottom">
        {date
          ? format.dateTime(new Date(date), {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })
          : 'Unknown'}
      </TooltipContent>
    </Tooltip>
  );
}
