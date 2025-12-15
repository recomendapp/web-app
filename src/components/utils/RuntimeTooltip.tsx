"use client"

import { useMemo } from 'react';
import { addMinutes } from 'date-fns';
import { ConvertHoursMinutes, cn } from '@/lib/utils';
import { TooltipBox } from '../Box/TooltipBox';
import { useFormatter } from '@/lib/i18n/client';
import { useNow } from '@/hooks/use-noew';

export function RuntimeTooltip({
  runtime,
  className,
}: {
  runtime: number;
  className?: string;
}) {
  const formatter = useFormatter();
  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const now = useNow({ updateInterval: 1000 * 60 });
  const endTime = useMemo(() => {
    if (!runtime) return null;
    return addMinutes(now, runtime);
  }, [runtime, now]);
  const formattedEndTime = useMemo(() => {
    if (!endTime) return null;
    return formatter.dateTime(endTime, {
      hour: 'numeric',
      minute: '2-digit',
      timeZone: userTimeZone,
    });
  }, [endTime, formatter, userTimeZone]);
  if (!runtime) return null;
  return (
    <TooltipBox tooltip={`Se termine à ${formattedEndTime}`}>
      <span className={cn('w-fit cursor-pointer', className)}>
        {ConvertHoursMinutes(runtime)}
      </span>
    </TooltipBox>
  );
}