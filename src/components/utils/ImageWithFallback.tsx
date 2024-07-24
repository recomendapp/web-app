'use client';
import Image from 'next/image';
import { ComponentProps, useEffect, useState } from 'react';

import { cn } from '@/lib/utils';
import { ImageIcon, ListVideo, UserIcon } from 'lucide-react';

interface ImageWithFallbackProps extends ComponentProps<typeof Image> {
  src: string;
  type?: 'default' | 'playlist' | 'person' | 'movie' | 'service' | 'watch-provider';
  blurDataURL?: string;
}

export const ImageWithFallback = ({
  src,
  alt,
  type = 'default',
  blurDataURL,
  className,
  ...rest
}: ImageWithFallbackProps) => {
  const [imgSrc, setImgSrc] = useState(src);

  useEffect(() => {
    setImgSrc(src);
  }, [src]);

  return (
    <>
      {imgSrc ? (
        <Image
          alt={alt}
          src={imgSrc}
          className={cn('', className)}
          onError={() => {
            setImgSrc('');
          }}
          placeholder={blurDataURL ? 'blur' : 'empty'}
          blurDataURL={blurDataURL}
          {...rest}
        />
      ) : (
        <Fallback type={type} from="#363636" to="#363636" alt={alt} />
      )}
    </>
  );
};

export function Fallback({
  type,
  from,
  to,
  alt,
}: {
  type?: string;
  from: string;
  to: string;
  alt: string;
}) {
  return (
    <div
      style={{
        backgroundImage: `linear-gradient(to top right, ${from}, ${to})`,
      }}
      className={`w-full rounded-md flex items-center justify-center h-full`}
    >
      {type == 'playlist' ? (
        <ListVideo color="#fff" className="w-2/5 h-2/5" />
      ) : type == 'person' ? (
        <UserIcon color="#fff" className="w-2/5 h-2/5" />
      ) : type == 'movie' ? (
        <span className="text-muted-foreground text-clamp-2 text-center">
          {alt}
        </span>
      ) : type == 'service' ? (
        <span className="text-muted-foreground text-clamp-2 text-center">
          {alt}
        </span>
      ) : (
        <ImageIcon color="#fff" className="w-2/5 h-2/5" />
      )}
    </div>
  );
}
