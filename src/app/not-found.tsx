import { AspectRatio } from '@/components/ui/aspect-ratio';
import { useUser } from '@/context/UserProvider';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function NotFound() {
  return (
    
    <main 
      className="bg-white w-full h-full flex justify-center items-center"
      style={{
        backgroundImage: `url('https://s.ltrbxd.com/static/img/errors/not-found-4.9da22e2b.jpg')`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className='text-4xl font-bold'>
        Oups, cette page n&apos;existe pas...
      </div>
    </main>
  );
}
