'use client'; // Error components must be Client Components

import { Button } from '@/components/ui/button';
import { useEffect } from 'react';

export default function Error({
  error
}: {
  error: Error
}) {
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
        Oups, cette playlist n'existe pas !
      </div>
    </main>
  );
}
