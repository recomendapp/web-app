'use client';

import { cn } from '@/lib/utils';
import Image from 'next/image';
import { useState } from 'react';

interface BoxProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  classNameChild?: string;
  background?: {
    src: string;
    alt: string;
    sizes?: string;
    unoptimized?: boolean;
  }
}

export const HeaderBox: React.FC<BoxProps> = ({
  children,
  className,
  background,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  return (
    <div className='@container/header-box'>
      <div
        className={cn(
          '@xl/header-box:h-[clamp(340px,30vh,400px)] w-full h-full flex p-4 relative transition-colors duration-300',
          (imageLoaded && !imageError) ? 'bg-gradient-to-t from-background to-[#00000050]' : 'bg-background',
          className
        )}
      >
        {(!imageError && background) && (
          <Image
            src={background.src}
            alt={background.alt}
            fill
            className="object-cover -z-10"
            sizes={background.sizes || `
            1140px
            `}
            onError={() => setImageError(true)}
            onLoad={() => setImageLoaded(true)}
            unoptimized={background.unoptimized}
          />
        )}
        {children}
      </div>
    </div>
  );
};
