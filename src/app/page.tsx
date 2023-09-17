'use client';

import { AspectRatio } from '@/components/ui/aspect-ratio';
import { useUser } from '@/context/UserProvider';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function Home() {
  const { user } = useUser();
  return (
    <main className="p-4 h-full">
      {/* TITLE */}
      {user && <div className="text-4xl font-bold">Bonjour {user.name}</div>}
      <div>
        
      </div>
    </main>
  );
}
