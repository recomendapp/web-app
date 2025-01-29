'use client';

import { ImageWithFallback } from '@/components/utils/ImageWithFallback';
import { cn } from '@/lib/utils';

export default function PersonPoster({
  className,
  poster_path,
  alt,
}: {
  className?: string;
  poster_path: string;
  alt: string;
}) {
  return (
    <div
      className={cn(
        'shadow-md z-0 relative shrink-0 w-full aspect-square',
        className
      )}
    >
      <ImageWithFallback
        src={poster_path}
        alt={alt}
        fill
        sizes={`
          (max-width: 640px) 150px,
          (max-width: 1024px) 175px,
          200px
        `}
        className="rounded-md object-cover z-0"
      />
    </div>
  );
}
