'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import fallbackImage from '@/assets/images/fallback/fallback-image.svg';
import { cn } from '@/lib/utils/utils';

interface ImageWithFallbackProps extends React.HTMLAttributes<HTMLDivElement> {
  src: string;
  alt: string;
  fill: boolean | undefined;
  width?: number | `${number}` | undefined;
  height?: number | `${number}` | undefined;
  type?: string | undefined;
}

export const ImageWithFallback = ({
  src,
  alt,
  fill,
  width,
  height,
  type = 'default',
  className,
  ...rest
}: ImageWithFallbackProps) => {
  const [imgSrc, setImgSrc] = useState(src);

  useEffect(() => {
    setImgSrc(src);
  }, [src]);

  const selectedFallbackImage = fallbackImage
    // : type === 'playlist' ? fallbackPlaylist
    // : type === 'film' && fallbackFilm

  // let selectedFallbackImage = fallbackImage;
  // if (type === 'playlist') {
  //   selectedFallbackImage = fallbackImagePlaylist;
  // } else if (type === 'film') {
  //   selectedFallbackImage = fallbackImageFilm;
  // }

  return (
    <Image
      alt={alt}
      height={height}
      width={width}
      fill={fill}
      src={imgSrc}
      // className={cn('transition-opacity opacity-0 duration-700', className)}
      className={cn('', className)}
      // onLoadingComplete={(image) => image.classList.remove("opacity-0")}
      onError={() => {
        setImgSrc(selectedFallbackImage);
      }}
    />
  );
};
