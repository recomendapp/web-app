import { Icons } from '@/config/icons';
import React from 'react';

export default function Loading() {
  return (
    <div className="bg-background w-full h-full flex justify-center items-center">
      <Icons.loader />
    </div>
  );
}
