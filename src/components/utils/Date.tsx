import { format } from 'date-fns';

// UI
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useLocale } from 'next-intl';
import { enUS, fr } from 'date-fns/locale';

export function DateOnlyYearTooltip({
  date,
  inline,
}: {
  date: string | null | undefined;
  inline?: boolean;
}) {
  const locale = useLocale();
  if (!date) return;
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          {inline ? (
            <span className="before:content-['_•_']">{date.split('-')[0]}</span>
          ) : (
            <p className="w-fit">{date.split('-')[0]}</p>
          )}
        </TooltipTrigger>
        <TooltipContent align="center" side="bottom">
          {date
            ? format(new Date(date), 'PPP', {
                locale: locale === 'fr' ? fr : enUS,
              })
            : 'Unknown'}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
