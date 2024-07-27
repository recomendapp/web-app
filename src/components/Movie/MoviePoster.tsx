'use client';

import { ImageWithFallback } from '@/components/utils/ImageWithFallback';
// import { AspectRatio } from "@/components/ui/aspect-ratio";
import { cn } from '@/lib/utils';
import { ComponentProps } from 'react';

interface MoviePosterProps extends ComponentProps<typeof ImageWithFallback> {
  classNameFallback?: string;
}

export default function MoviePoster({
  children,
  className,
  classNameFallback,
  alt,
  ...props
}: MoviePosterProps) {
  return (
    <div
      className={cn(
        'shadow-md relative shrink-0 w-full aspect-[2/3]',
        className
      )}
    >
      <ImageWithFallback
        alt={alt}
        className={cn("rounded-md object-cover", classNameFallback)}
        type='movie'
        {...props}
      />
      {children}
    </div>
  );
}
