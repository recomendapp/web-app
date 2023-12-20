'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import { cn } from '@/lib/utils';
import { ImageIcon, ListVideo, UserIcon } from 'lucide-react';

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

  return (
    <>
      {imgSrc ?
        <Image
          alt={alt}
          height={height}
          width={width}
          fill={fill}
          src={imgSrc}
          className={cn('', className)}
          onError={() => {
            setImgSrc('');
          }}
        />
      :
        <Fallback
          type={type}
          from="#363636"
          to="#363636"
        />
      }

    </>
    
  );
};

export function Fallback({
  type,
  from,
  to
} : {
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
    {type == 'playlist' ? 
        <ListVideo color="#fff" className='w-2/5 h-2/5'/>
      : type == 'person' ?
        <UserIcon color="#fff" className='w-2/5 h-2/5'/>
      :
        <ImageIcon color="#fff" className='w-2/5 h-2/5'/>
    }
  </div>
  )
}
