'use client';

import { ImageWithFallback } from '@/components/utils/ImageWithFallback';
// import { AspectRatio } from "@/components/ui/aspect-ratio";
import { cn } from '@/lib/utils';

export default function MoviePoster({
  children,
  className,
  poster_path,
  alt,
}: {
  children?: React.ReactNode;
  className?: string;
  poster_path: string;
  alt: string;
}) {
  return (
    <div
      className={cn(
        'shadow-md relative shrink-0 w-full aspect-[2/3]',
        className
      )}
    >
      <ImageWithFallback
        src={poster_path}
        alt={alt}
        fill
        className="rounded-md object-cover"
      />
      {children}
    </div>
  );
}
