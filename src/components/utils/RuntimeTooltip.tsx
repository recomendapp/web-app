"use client";

import { addMinutes } from 'date-fns';
import { useFormatter } from 'next-intl';
import { ConvertHoursMinutes, cn } from '@/lib/utils';
import { TooltipBox } from '../Box/TooltipBox';

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
    <TooltipBox tooltip={runtime ? `Se termine à ${formattedEndTime}` : 'Unknown'}>
      <span className={cn('w-fit cursor-pointer', className)}>{ConvertHoursMinutes(runtime ?? 0)}</span>
    </TooltipBox>
  )
}
