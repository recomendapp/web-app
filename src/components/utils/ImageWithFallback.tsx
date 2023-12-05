'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import { cn } from '@/lib/utils';
import { ImageIcon, ListVideo } from 'lucide-react';

interface ImageWithFallbackProps extends React.HTMLAttributes<HTMLDivElement> {
  src: string;
  alt: string;
  fill?: boolean | undefined;
  width?: number | `${number}` | undefined;
  height?: number | `${number}` | undefined;
  type?: string;
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
    // : type === 'playlist' ? fallbackPlaylist
    // : type === 'film' && fallbackFilm

  // let selectedFallbackImage = fallbackImage;
  // if (type === 'playlist') {
  //   selectedFallbackImage = fallbackImagePlaylist;
  // } else if (type === 'film') {
  //   selectedFallbackImage = fallbackImageFilm;
  // }

  return (
    <>
      {imgSrc ?
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
            setImgSrc('');
          }}
        />
      :
        <Fallback
          type={type}
          from="#363636"
          to="#363636"
        >
        </Fallback>
      }

    </>
    
  );
};

export function Fallback({
  children,
  type,
  from,
  to
} : {
  children: React.ReactNode,
  type?: string,
  from: string,
  to: string
}) {
  return (
    <div
    style={{
      backgroundImage: `linear-gradient(to top right, ${from}, ${to})`,
    }}
    className={`w-full rounded-md flex items-center justify-center h-full`}
  >
    {!children ? (
      type == 'playlist' ? 
        <ListVideo color="#fff" className='w-1/2 h-1/2'/>
      :
        <ImageIcon color="#fff" className='w-1/2 h-1/2'/>
    ) : (
      children
    )}
  </div>
  )
}
