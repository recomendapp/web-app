"use client";

import { useState, useEffect, useMemo } from 'react';
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
  const [endTime, setEndTime] = useState<Date | null>(null);
  const formattedEndTime = useMemo(() => {
    if (!endTime) return null;
    return format.dateTime(endTime, {
      hour: 'numeric',
      minute: '2-digit',
    });
  }, [endTime]);

  useEffect(() => {
    const now = new Date();
    setEndTime(addMinutes(now, runtime));
  }, [runtime]);

  if (!runtime || !endTime) return null;


  return (
    <TooltipBox tooltip={`Se termine à ${formattedEndTime}`}>
      <span className={cn('w-fit cursor-pointer', className)}>
        {ConvertHoursMinutes(runtime)}
      </span>
    </TooltipBox>
  );
}