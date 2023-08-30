'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import fallbackImage from '@/assets/images/fallback/fallback-image.svg';
import { cn } from '@/lib/utils';

interface ImageWithFallbackProps extends React.HTMLAttributes<HTMLDivElement> {
  src: string;
  alt: string;
  fill: boolean | undefined;
  width?: number | `${number}` | undefined;
  height?: number | `${number}` | undefined;
}

export const ImageWithFallback = ({
  src,
  alt,
  fill,
  width,
  height,
  className,
  ...rest
}: ImageWithFallbackProps) => {
  const [imgSrc, setImgSrc] = useState(src);

  useEffect(() => {
    setImgSrc(src);
  }, [src]);

  return (
    <Image
      alt={alt}
      height={height}
      width={width}
      fill={fill}
      src={imgSrc}
      className={cn('', className)}
      onError={() => {
        setImgSrc(fallbackImage);
      }}
    />
  );
};
