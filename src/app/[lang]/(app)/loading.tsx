import Loader from '@/components/Loader/Loader';
import React from 'react';

export default function Loading() {
  return (
    
    <main 
      className="bg-background w-full h-full flex justify-center items-center"
    >
      <Loader />
    </main>
  );
}
